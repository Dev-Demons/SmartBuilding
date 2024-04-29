use bevy::{prelude::*, sprite::TextureAtlasLayout, ui::widget::UiImageSize};
use bevy_dui::*;

#[derive(Component)]
pub struct Spinner;

pub struct SpinnerPlugin;

impl Plugin for SpinnerPlugin {
    fn build(&self, app: &mut App) {
        app.add_systems(Startup, setup)
            .add_systems(Update, spin_spinners);
    }
}

fn setup(
    mut dui: ResMut<DuiRegistry>,
    asset_server: Res<AssetServer>,
    mut texture_atlases: ResMut<Assets<TextureAtlasLayout>>,
) {
    dui.register_template("spinner", DuiSpinnerTemplate);

    let texture = asset_server.load::<Image>("images/spinner_atlas.png");
    let texture_atlas_layout =
        TextureAtlasLayout::from_grid(Vec2::new(34.0, 34.0), 8, 1, None, None);
    let texture_atlas_layout_handle = texture_atlases.add(texture_atlas_layout);

    dui.set_default_prop("spinner-image", texture);
    dui.set_default_prop("spinner-layout", texture_atlas_layout_handle);
}

fn spin_spinners(mut q: Query<&mut TextureAtlas, With<Spinner>>, time: Res<Time>) {
    for mut t in q.iter_mut() {
        t.index = (time.elapsed_seconds() * 8.0) as usize % 8;
    }
}

pub struct DuiSpinnerTemplate;
impl DuiTemplate for DuiSpinnerTemplate {
    fn render(
        &self,
        commands: &mut bevy::ecs::system::EntityCommands,
        props: DuiProps,
        ctx: &mut DuiContext,
    ) -> Result<bevy_dui::NodeMap, anyhow::Error> {
        ctx.render_template(commands, "spinner-base", DuiProps::new())?;

        let layout = props
            .borrow::<Handle<TextureAtlasLayout>>("spinner-layout", ctx)?
            .unwrap()
            .clone();
        let image = props
            .borrow::<Handle<Image>>("spinner-image", ctx)?
            .unwrap()
            .clone();

        commands.insert((
            UiImage::new(image),
            TextureAtlas { layout, index: 0 },
            BackgroundColor(Color::WHITE),
            UiImageSize::default(),
            Spinner,
        ));
        Ok(Default::default())
    }
}
