use std::f32::consts::FRAC_PI_2;

use bevy::{prelude::*, render::mesh::VertexAttributeValues, utils::HashMap};

use common::{sets::SceneSets, structs::AppConfig};

use dcl::interface::ComponentPosition;
use dcl_component::{
    proto_components::sdk::components::{pb_mesh_renderer, PbMeshRenderer},
    SceneComponentId,
};
use scene_material::{SceneBound, SceneMaterial};

use crate::{renderer_context::RendererSceneContext, SceneEntity};

use self::truncated_cone::TruncatedCone;

use super::AddCrdtInterfaceExt;

pub mod truncated_cone;
pub struct MeshDefinitionPlugin;

#[derive(Component, Debug)]
pub enum MeshDefinition {
    Box { uvs: Vec<[f32; 2]> },
    Cylinder { radius_top: f32, radius_bottom: f32 },
    Plane { uvs: Vec<[f32; 2]> },
    Sphere,
}

#[derive(Resource)]
pub struct MeshPrimitiveDefaults {
    boxx: Handle<Mesh>,
    plane: Handle<Mesh>,
    cylinder: Handle<Mesh>,
    sphere: Handle<Mesh>,
}

impl From<PbMeshRenderer> for MeshDefinition {
    fn from(value: PbMeshRenderer) -> Self {
        match value.mesh {
            Some(pb_mesh_renderer::Mesh::Box(pb_mesh_renderer::BoxMesh { uvs })) => Self::Box {
                uvs: uvs
                    .chunks(2)
                    .map(|chunk| <[f32; 2]>::try_from(chunk).unwrap_or_default())
                    .collect(),
            },
            Some(pb_mesh_renderer::Mesh::Cylinder(pb_mesh_renderer::CylinderMesh {
                radius_bottom,
                radius_top,
            })) => Self::Cylinder {
                radius_top: radius_top.unwrap_or(1.0),
                radius_bottom: radius_bottom.unwrap_or(1.0),
            },
            Some(pb_mesh_renderer::Mesh::Plane(pb_mesh_renderer::PlaneMesh { uvs })) => {
                Self::Plane {
                    uvs: uvs
                        .chunks(2)
                        .map(|chunk| <[f32; 2]>::try_from(chunk).unwrap_or_default())
                        .collect(),
                }
            }
            Some(pb_mesh_renderer::Mesh::Sphere(pb_mesh_renderer::SphereMesh {})) => Self::Sphere,
            _ => Self::Box {
                uvs: Vec::default(),
            },
        }
    }
}

impl Plugin for MeshDefinitionPlugin {
    fn build(&self, app: &mut App) {
        app.add_crdt_lww_component::<PbMeshRenderer, MeshDefinition>(
            SceneComponentId::MESH_RENDERER,
            ComponentPosition::EntityOnly,
        );

        let generate_tangents = |mut mesh: Mesh| {
            mesh.generate_tangents().unwrap();
            mesh
        };
        let flip_uv = |mut mesh: Mesh| {
            let Some(VertexAttributeValues::Float32x3(ref mut positions)) =
                mesh.attribute_mut(Mesh::ATTRIBUTE_POSITION)
            else {
                panic!()
            };
            for pos in positions.iter_mut() {
                *pos = [pos[0], -pos[2], pos[1]];
            }
            let Some(VertexAttributeValues::Float32x3(ref mut normals)) =
                mesh.attribute_mut(Mesh::ATTRIBUTE_NORMAL)
            else {
                panic!()
            };
            for pos in normals.iter_mut() {
                *pos = [pos[0], -pos[2], pos[1]];
            }
            mesh
        };

        let mut assets = app.world.resource_mut::<Assets<Mesh>>();
        let boxx = assets.add(generate_tangents(
            bevy::math::primitives::Cuboid::default().into(),
        ));
        let cylinder = assets.add(generate_tangents(Cylinder::default().into()));
        let plane = assets.add(generate_tangents(Rectangle::default().mesh()));
        let sphere = assets.add(generate_tangents(flip_uv(
            Sphere::new(0.5).mesh().uv(36, 18),
        )));
        app.insert_resource(MeshPrimitiveDefaults {
            boxx,
            plane,
            cylinder,
            sphere,
        });

        app.add_systems(Update, update_mesh.in_set(SceneSets::PostLoop));
    }
}

#[allow(clippy::type_complexity, clippy::too_many_arguments)]
pub fn update_mesh(
    mut commands: Commands,
    new_primitives: Query<
        (
            Entity,
            &SceneEntity,
            &MeshDefinition,
            Option<&Handle<SceneMaterial>>,
        ),
        Changed<MeshDefinition>,
    >,
    mut removed_primitives: RemovedComponents<MeshDefinition>,
    mut meshes: ResMut<Assets<Mesh>>,
    defaults: Res<MeshPrimitiveDefaults>,
    mut default_material: Local<HashMap<Entity, Handle<SceneMaterial>>>,
    mut materials: ResMut<Assets<SceneMaterial>>,
    scenes: Query<&RendererSceneContext>,
    config: Res<AppConfig>,
) {
    for (ent, scene_ent, prim, maybe_material) in new_primitives.iter() {
        let handle = match prim {
            MeshDefinition::Box { uvs } => {
                if uvs.is_empty() {
                    defaults.boxx.clone()
                } else {
                    let mut mesh = Mesh::from(bevy::math::primitives::Cuboid::default());
                    let Some(VertexAttributeValues::Float32x2(mesh_uvs)) =
                        mesh.attribute_mut(Mesh::ATTRIBUTE_UV_0)
                    else {
                        panic!("uvs are not f32x2")
                    };
                    for (attr, uv) in mesh_uvs.iter_mut().zip(uvs) {
                        *attr = *uv
                    }
                    meshes.add(mesh)
                }
            }
            MeshDefinition::Cylinder {
                radius_bottom,
                radius_top,
            } => {
                if *radius_bottom == 1.0 && *radius_top == 1.0 {
                    defaults.cylinder.clone()
                } else {
                    meshes.add(Mesh::from(TruncatedCone {
                        base_radius: *radius_bottom,
                        tip_radius: *radius_top,
                        ..Default::default()
                    }))
                }
            }
            MeshDefinition::Plane { uvs } => {
                if uvs.is_empty() {
                    defaults.plane.clone()
                } else {
                    let mut mesh = Rectangle::default()
                        .mesh()
                        .rotated_by(Quat::from_rotation_z(-FRAC_PI_2));
                    let Some(VertexAttributeValues::Float32x2(mesh_uvs)) =
                        mesh.attribute_mut(Mesh::ATTRIBUTE_UV_0)
                    else {
                        panic!("uvs are not f32x2")
                    };
                    for (attr, uv) in mesh_uvs.iter_mut().zip(uvs) {
                        attr[0] = uv[0];
                        attr[1] = 1.0 - uv[1];
                    }
                    meshes.add(mesh)
                }
            }
            MeshDefinition::Sphere => defaults.sphere.clone(),
        };
        commands.entity(ent).try_insert(handle);

        if maybe_material.is_none() {
            let mat = default_material.entry(scene_ent.root).or_insert_with(|| {
                let bounds = scenes
                    .get(scene_ent.root)
                    .map(|c| c.bounds)
                    .unwrap_or_default();
                materials.add(SceneMaterial {
                    base: Default::default(),
                    extension: SceneBound::new(bounds, config.graphics.oob),
                })
            });

            commands.entity(ent).try_insert(mat.clone());
        }
    }

    for ent in removed_primitives.read() {
        if let Some(mut e) = commands.get_entity(ent) {
            e.remove::<(Handle<Mesh>, Handle<SceneMaterial>)>();
        }
    }

    default_material.retain(|scene, _| scenes.get(*scene).is_ok());
}
