// Copyright 2017-2024 the openage authors. See copying.md for legal info.

#pragma once

#include <vulkan/vulkan.h>

#include "../../util/path.h"
#include "../renderer.h"

#include "graphics_device.h"


namespace openage {
namespace renderer {
namespace vulkan {

/// A renderer using the Vulkan API.
class VlkRenderer {
	VkInstance instance;

	VkSurfaceKHR surface;

public:
	VlkRenderer(VkInstance instance, VkSurfaceKHR surface) :
		instance(instance), surface(surface) {}

	/// Testing function that draws a triangle. Not part of the final renderer implementation.
	void do_the_thing(util::Path &dir);
};

} // namespace vulkan
} // namespace renderer
} // namespace openage
