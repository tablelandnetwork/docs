---
id: template # Optional; only include if page reference should not be file name
sidebar_position: 1
title: Example Page Title # Title of the page
sidebar_label: Page Title # Optional; only include if the sidebar should display different text than `title`
description: "Example description." # Description, used in metadata
keywords:
  - example # Add keywords to help with search functionality
image: "img/tableland/example-image.png" # Optionally, set a custom image to override the generic default
slug: template # Optional; only include if page slug should not be file name
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import thumbnail from '../static/img/tableland/example-image.png';

Description here.

## First Header

Content here. Below is an image with default `useBaseUrl` method:
<img src={useBaseUrl("/img/tableland/example-image.png")} />

Example image using `Image` from `@docusaurus/plugin-ideal-image`:
<Image img={thumbnail} />
