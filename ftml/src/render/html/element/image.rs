/*
 * render/html/element/image.rs
 *
 * ftml - Library to parse Wikidot text
 * Copyright (C) 2019-2021 Wikijump Team
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

use super::prelude::*;
use crate::tree::{AttributeMap, ImageAlignment, ImageSource};

pub fn render_image(
    log: &Logger,
    ctx: &mut HtmlContext,
    source: &ImageSource,
    link: Option<&str>,
    align: Option<ImageAlignment>,
    attributes: &AttributeMap,
) {
    debug!(
        log,
        "Rendering image element";
        "source" => source.name(),
        "link" => link.unwrap_or("<none>"),
        "align" => match align {
            Some(image) => image.align.name(),
            None => "<default>",
        },
        "float" => match align {
            Some(image) => image.float,
            None => false,
        },
    );

    let source_url = ctx.handle().get_image_link(log, ctx.info(), source);

    let image_classes = match align {
        Some(align) => ["image-container", " ", align.class()],
        None => ["image-container", "", ""],
    };

    ctx.html()
        .div()
        .attr("class", &image_classes)
        .contents(|ctx| {
            let build_image = |ctx: &mut HtmlContext| {
                ctx.html()
                    .img()
                    .attr("src", &[&source_url])
                    .attr_map_prepend(attributes, ("class", "image"));
            };

            match link {
                Some(link) => {
                    ctx.html().a().attr("href", &[link]).contents(build_image);
                }
                None => build_image(ctx),
            };
        });
}
