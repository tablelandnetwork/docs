---
id: example-page # Required to ensure all pages have unique, non-generic identifiers (like `intro` etc.)
title: Example Page Title # Title of the page
sidebar_position: 1
sidebar_label: Page Title # Optional; only include if the sidebar should display different text than `title`
description: "Example description." # Description, used in metadata
keywords:
  - example # Add keywords to help with search functionality
image: "img/tableland/example-image.png" # Optionally, set a custom image to override the generic default
slug: using-different-images # Optional; only include if page slug should not be file name
---

<!-- Imports at the top -->

import useBaseUrl from '@docusaurus/useBaseUrl';
import myImage from '../static/img/tableland/example-image.png'

<!-- Include a brief about the page, in a few sentences -->

Description here.

<!-- The page should then start with a `##` tag and its associated content -->

## First Header

<!-- An example image, using the default functionality -->

Content here. Below is an image with default `useBaseUrl` method:
<img src={useBaseUrl("/img/tableland/example-image.png")} />
