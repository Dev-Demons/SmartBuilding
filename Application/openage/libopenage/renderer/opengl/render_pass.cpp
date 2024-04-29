// Copyright 2019-2024 the openage authors. See copying.md for legal info.

#include "render_pass.h"

#include "log/log.h"


namespace openage::renderer::opengl {

GlRenderPass::GlRenderPass(std::vector<Renderable> renderables,
                           const std::shared_ptr<RenderTarget> &target) :
	RenderPass(renderables, target),
	is_optimised(false) {
	log::log(MSG(dbg) << "Created OpenGL render pass");
}

const std::vector<Renderable> &GlRenderPass::get_renderables() const {
	return this->renderables;
}

void GlRenderPass::set_renderables(std::vector<Renderable> renderables) {
	this->renderables = renderables;
	this->is_optimised = false;
}

bool GlRenderPass::get_is_optimised() const {
	return this->is_optimised;
}

void GlRenderPass::set_is_optimised(bool flag) {
	this->is_optimised = flag;
}
} // namespace openage::renderer::opengl
