Middleman - static site generator
===============

- Files and folders:
  - `source/` 
    - This is where your main website files go (templates, javascript, images, css, etc.)
  - `build/`
    - This is where your static file gets built into
  - `data/`
    - You can put various json or YML files in this directory and then reference them in templates (see [here](#data-files))
  - `lib/`
    - This is where you put [helpers](#helpers) for building your application
  - `config.rb`
    - [Middleman settings](https://middlemanapp.com/advanced/configuration/)
  - `config.ru`
    - Settings for using a Rack-enabled webserver (e.g. in development mode) 

## Configuration
- [info](https://middlemanapp.com/advanced/configuration/)
- Mostly happening in `config.rb`
- You can:
  - (re)set OOTB configurations (ie Change Settings)
  - Configure Extensions
    - Usually using the `activate` call
  - Set custom environment-specific settings or actions
    - Remember there are 2 environments: `development` and `build`
    
    ```(ruby)
    # do some stuff when first running in build-denvironment
    configure :build do
      activate :minify_css  #activate an extension

      do_my_custom_setup_function

      #apply a custom configuration
      config[:host] = "http://www.example.com"
    end
    ```

    - These custom settings are accessible from templates and helpers

    ```(ruby)
    # layout / template
    <h1>
      Thanks for visiting <%= config[:host] %>!
    </h1>

    # helpers
    module CustomHelpers
      def home_link
        link_to "Home", config[:host]
      end
    end
    ```

    
## Helpers
- View helpers, based on [padrino framework](http://padrinorb.com/guides/application-helpers/overview/) are available in the templates
- TODO: more info here

## Dynamic Data
- There are 3 main places where you can use data files in your application:
  1. Sitemap
  2. Data Files
  3. Embedded page data: "FrontMatter"

### Data files
- You can take any data (in json or YML) and drop it in the `data/` directory
- Reference this data in your templates with: `data.<name-of-file>.<data-path>`, e.g.

```(erb)
<h1>Friends</h1>
<ol>
  <% data.people.friends.each do |f| %>
  <li><%= f %></li>
  <% end %>
</ol>
```

where `data/friends.json` contains

```(json)
{
  "friends": [
    "Tom",
    "Dick",
    "Harry"
  ]
}
```

### Sitemap
- Middleman creates an in-memory sitemap object which is available throughout the application, and provides various analysis/access/traversal functionality
  - You can even see a pages frontmatter data
- To inspect it in development-mode, you can check: http://localhost:4567/__middleman/sitemap/
- There's also a `find_resource_by_path` method
- Each node in the sitemap is a [resource object](http://www.rubydoc.info/gems/middleman-core/Middleman/Sitemap/Resource)
- Common use case for using the sitemap object is creating navigations in templates
- If you need to use proxies, then you would reference the sitemap object in `config.rb`, BUT it has to handled in a callback from the `ready` event (bc it's not populated until after `config.rb` has been processed)

### Embedded Page Data
- AKA Frontmatter
- There's a special syntax to embed YML or json data into a template and then use that data in the template

```(erb)
---
layout: "custom"
title: "My Title"
my_list:
  - one
  - two
  - three
---

<h1>List</h1>
<ol>
  <% current_page.data.my_list.each do |f| %>
  <li><%= f %></li>
  <% end %>
</ol>
```

## Dynamic Pages
- Typically, the various template files in `source/` correspond 1:1 with the pages output in `build/`
- Proxies give you the ability to create multiple files based on a single template (specified in `config.rb`)

```(ruby)
# Assumes the file source/about/template.html.erb exists
["tom", "dick", "harry"].each do |name|
  proxy "/about/#{name}.html", "/about/template.html", :locals => { :person_name => name }, :ignore => true
end
```
