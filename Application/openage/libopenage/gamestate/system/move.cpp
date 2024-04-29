// Copyright 2023-2023 the openage authors. See copying.md for legal info.

#include "move.h"

#include <compare>
#include <vector>

#include <nyan/nyan.h>

#include "log/log.h"
#include "log/message.h"

#include "coord/phys.h"
#include "curve/continuous.h"
#include "curve/segmented.h"
#include "gamestate/api/ability.h"
#include "gamestate/api/animation.h"
#include "gamestate/api/property.h"
#include "gamestate/api/types.h"
#include "gamestate/component/api/move.h"
#include "gamestate/component/api/turn.h"
#include "gamestate/component/internal/command_queue.h"
#include "gamestate/component/internal/commands/move.h"
#include "gamestate/component/internal/position.h"
#include "gamestate/component/types.h"
#include "gamestate/game_entity.h"
#include "util/fixed_point.h"


namespace openage::gamestate::system {
const time::time_t Move::move_command(const std::shared_ptr<gamestate::GameEntity> &entity,
                                      const time::time_t &start_time) {
	auto command_queue = std::dynamic_pointer_cast<component::CommandQueue>(
		entity->get_component(component::component_t::COMMANDQUEUE));
	auto command = std::dynamic_pointer_cast<component::command::MoveCommand>(
		command_queue->pop_command(start_time));

	if (not command) [[unlikely]] {
		log::log(MSG(warn) << "Command is not a move command.");
		return time::time_t::from_int(0);
	}

	return Move::move_default(entity, command->get_target(), start_time);
}


const time::time_t Move::move_default(const std::shared_ptr<gamestate::GameEntity> &entity,
                                      const coord::phys3 &destination,
                                      const time::time_t &start_time) {
	if (not entity->has_component(component::component_t::MOVE)) [[unlikely]] {
		log::log(WARN << "Entity " << entity->get_id() << " has no move component.");
		return time::time_t::from_int(0);
	}

	auto turn_component = std::dynamic_pointer_cast<component::Turn>(
		entity->get_component(component::component_t::TURN));
	auto turn_ability = turn_component->get_ability();
	auto turn_speed = turn_ability.get<nyan::Float>("Turn.turn_speed");

	auto move_component = std::dynamic_pointer_cast<component::Move>(
		entity->get_component(component::component_t::MOVE));
	auto move_ability = move_component->get_ability();
	auto move_speed = move_ability.get<nyan::Float>("Move.speed");

	auto pos_component = std::dynamic_pointer_cast<component::Position>(
		entity->get_component(component::component_t::POSITION));

	auto &positions = pos_component->get_positions();
	auto &angles = pos_component->get_angles();
	auto current_pos = positions.get(start_time);
	auto current_angle = angles.get(start_time);

	// TODO: pathfinder
	auto path = destination.to_phys2() - current_pos.to_phys2();
	auto new_angle = path.to_angle();

	// rotation
	double turn_time = 0;
	if (not turn_speed->is_infinite_positive()) {
		auto angle_diff = new_angle - current_angle;
		if (angle_diff < 0) {
			// get the positive difference
			angle_diff = angle_diff * -1;
		}
		if (angle_diff > 180) {
			// always use the smaller angle
			angle_diff = angle_diff - 360;
			angle_diff = angle_diff * -1;
		}

		turn_time = angle_diff.to_double() / turn_speed->get();
	}
	pos_component->set_angle(start_time + turn_time, new_angle);

	// movement
	double move_time = 0;
	if (not move_speed->is_infinite_positive()) {
		auto distance = path.length();
		move_time = distance / move_speed->get();
	}

	pos_component->set_position(start_time, current_pos);
	pos_component->set_position(start_time + turn_time + move_time, destination);

	auto ability = move_component->get_ability();
	if (api::APIAbility::check_property(ability, api::ability_property_t::ANIMATED)) {
		auto property = api::APIAbility::get_property(ability, api::ability_property_t::ANIMATED);
		auto animations = api::APIAbilityProperty::get_animations(property);
		auto animation_paths = api::APIAnimation::get_animation_paths(animations);

		if (animation_paths.size() > 0) [[likely]] {
			entity->render_update(start_time, animation_paths[0]);
		}
	}

	return turn_time + move_time;
}

} // namespace openage::gamestate::system
