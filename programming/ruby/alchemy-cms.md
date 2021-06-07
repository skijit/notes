CMS Alchemy
==========

## Basics
- The Alchemy content DB only stores text, rich-text, and ids.
  - No HTML, css, etc
  - Hence 'headless'
  - Makes the content editor a lot easier!
- [Lots of view helper function OOTB](https://www.rubydoc.info/github/AlchemyCMS/alchemy_cms/Alchemy/PagesHelper.html)
- Object Model
  - Layouts
  - Cells
  - Elements
  - Essences

## Pages and Page Types
- **Pages**: Content-Level vs **Page Type**: Implementation-Level
- Editable from the admin view  
- Properties include:
  - Name
  - Url
  - Part of a hierarchy
  - **have no content**
  - Publishing status
  - Visibility
  - SEO attributes
- Pages are instances of a **'Page Type'**
  - Alchemy (horribly) calls these 'Page Types' *Page Layouts*
  - All of the Page Layouts are defined in `config/alchemy/page_layouts.yml`
    - follows a particular schema of properties which are inherited by the corresponding pages (along with corresponding behavior):
      - `name`: (required) how you refer to the layout
      - `elements`: array of elements that CAN be used on the page
      - `autogenerate`" array of elements that are automatically inserted into a page when it is generated
      - `cache`: whether it should be cached or not (e.g. don't cache pages that have forms)
      -  `layoutpage`: (boolean) THIS WOULD BE WHETHER IT'S AN ACTUAL LAYOUT
      - `controller`: override the controller used
      - `action`: override the action used
      - `unique`: whether this page layout can only be used once
- Each of these Page Types (page layouts... ugh) has a partial view living in `app/views/alchemy/page_layouts`
  - The file is named after the corresponding `name` property in the `page_layouts.yml`
  - Alchemy comes with a generator that can stub out these files for you
- Global Pages (ie actual Layouts)
  - Also have to be defined in `page_layouts.yml`
  - But you set property `layout_page: true`
  - Rendering an element in a 'Global Page' looks like this:  (notice it's conditional on the current page)

  ```
  <%= render_elements only: 'news_teaser', from_page: 'sidebar' %>
  ```
- Page layout (Page Type) names can be translated in the `config/locales/alchemy.<lang>.yml` file

## Cells
- (Deprecated in more recent versions of ALchemy for 'Fixed Elements')
- Containers for elements: basically a higher-level grouping for elements
- You can't really change the position of elements inside a cell
- Defined in `config/alchemy/page_layouts.yml`
  - `name`
  - `elements`: array of the elements that can be used in the cell
    - has to intersect with the element in corresponding Page_Type
- corresponding view lives here: `/app/views/alchemy/cells/<name>.html.erb`
- Good for sidebars or heros

## Elements
- This is the core of the CMS
  - Analogous to Widgets, Blocks, etc. in other CMS'es
- A reusable bundle of content
  - e.g. Article: Headline, Body, Picture
- Nestable!
- All elements have 2 partial views:
  - `<element_name>_view`
  - `<element_name>_editor` (renders form field in the editor)  <- Deprecated in new alchemy
- defined in `config/alchemy/elements.yml`
  - use this generator when you add an element to the yml: `bin/rails g alchemy:elements --skip`
  - NOTE: when you add elements, you need to restart the rails server to see it
- common properties for elements:
  - `name`: required
  - `contents`: array of *essences* used by your element
    - each essence has a:
      - `name`: of course
      - `type`: fixed types, such as `EssencePicture`, `EssenceText`, or `EssenceRichText`
  - `nestable_elements`: array of the nested element names
  - `validate`: collection of validations used on the contents
    - OOTB validators include `presence`, `uniqueness`, and `format` (<- takes a regex as it's value)

- Rendering All Elements

```(erb)
<div class="row">
  <%= render_elements %>
</div>
```

- Render only specific elements

```(erb)
<body>
  <header><%= render_elements only: 'header' %></header>

  <main>
    <%= render_elements except: %w(header footer) %>
  </main>

  <footer><%= render_elements only: 'footer' %></footer>
</body>
```

- Rendering from a Global Page

```(erb)
<body>
  <header><%= render_elements from_page: 'header' %></header>

  <main>
    <%= render_elements %>
  </main>

  <footer><%= render_elements from_page: 'footer' %></footer>
</body>
```

- Rendering Nested Elements

```(erb)
<%= element_view_for(element) do |el| %>
  <h3><%= el.render :headline %></h3>

  <div class="text-blocks">
    <% element.nested_elements.each do |nested_element| %>
      <%= render_element nested_element %>
    <% end %>
  </div>
<% end %>
```

- How to Define the Rendering for the actual Element
  - You'll want to customize the view generated for you
  
```(erb)
<%= element_view_for(element, tag: 'li', class: 'red', id: 'my_unique_id') do |el| %>
  <h3><%= el.render :headline %></h3>
  <div class="row">
    <div class="large-6 columns">
      <p>
        <%= el.render :image, {size: '200x300'}, class: 'image-large' %>
      </p>
    </div>
    <div class="large-6 columns">
      <p>
        <%= el.render :text %>
      </p>
    </div>
  </div>
<% end %>
```

  - `element_view_for` wraps the element in an HTML element.  
    - `tag` argument defines what html element it is wrapped in
      - if you pass false, it is wrapped in nothing!
  - `el.render` is how you render the essence view
    - first hash is the options
    - second hash is html options
    - not all essence types have these parameters
## Essences
- Store the content
- Instances of `Alchemy::Content` on each `Alchemy::Element` instance
- Essences are Rails models. 
- The are many provided OOTB, but you can [also create your own](https://guides.alchemy-cms.com/create_essences.html)
- Essences are declared in the same ol elements file: `config/alchemy/elements.yml`
  - The key properties you would set here are:
    - `name`: required, string
    - `type`: custom or OOTB essence type (see below)
    - `hint`: hint displayed to the admin how this is used (typically a string, but also symbol or boolean is ok)
    - `default`: default value
    - `as_element_title`: (boolean) whether this essences name should be used as the name of the element (defaults to the first)
    - `settings`: hash for additional settings, depends on the essence type
- OOTB Essence Types:
  - `EssenceText`: 255 char max
  - `EssenceRichText`: 
  - `EssencePicture`:
  - `EssenceDate`:
  - `EssenceHtml`:
    - Unsanitzed/Unescaped text
  - `EssenceBoolean`:
  - `EssenceSelect`:
  - `EssenceLink`:
  - [Check user guide for specific settings](https://guides.alchemy-cms.com/essences.html)

- [source](https://guides.alchemy-cms.com/)
