(function() {

  const Templates = {}

  /* Creates an HTMLElement to display an entry in editing, creating, or
   * viewing mode.
   *
   * Arguments:
   * options -- an object with the following key-value pairs:
   *   viewing: whether to render the entry viewing page
   *   editing: whether to render the entry editing page
   *   creating: whether to render the entry creating page
   *
   *   When viewing or editing is true:
   *    activeEntryData: an object with data for the entry being viewed/edited
   *
   *   When viewing is true:
   *    entries: an array of entry objects for the selection dropdown
   *
   * Only one of viewing, editing, and creating should be true.
   */
  Templates.renderEntry = options => {
    const activeEntryData = options.activeEntryData

    let name = ''
    let address = ''
    let description = ''
    let actions = []
    let dropdown = ''

    if (options.editing) {
      // able to update name, address, and description
      name = tag('input', {
        type: 'text',
        name: 'name',
        value: activeEntryData.name
      }, [])
      address = tag('input', {
        type: 'text',
        name: 'address',
        value: activeEntryData.address
      }, [])

      description = tag('textarea', {name: 'description'},
                        activeEntryData.description)
      actions = [tag('button', {class: 'teal update'}, 'Update')]
    } else if (options.creating) {
      // able to set name, address, and description
      name = tag('input', {
        type: 'text',
        name: 'name'
      }, [])
      address = tag('input', {
        type: 'text',
        name: 'address'
      }, [])

      description = tag('textarea', {name: 'description'}, [])
      actions = [tag('button', {class: 'green add'}, 'Add')]
    } else if (options.viewing) {
      // no editing, but three call to action buttons
      name = tag('span', {}, activeEntryData.name)
      address = tag('span', {}, activeEntryData.address)

      description = tag('span', {}, activeEntryData.description)
      actions = [
        tag('button', {class: 'green new'}, 'New'),
        ' ',
        tag('button', {class: 'teal edit'}, 'Edit'),
        ' ',
        tag('button', {class: 'red delete'}, 'Delete')
      ]

      // dropdown with options for each entry
      options = options.entries.map(entry => {
        return tag('option', {value: entry.id}, entry.name)
      })
      options.unshift(tag('option', {value: '-1'}, 'Pick location...'))

      dropdown = tag('div', {class: 'dropdown'}, [
        tag('button', {}, ''),
        tag('select', {}, options)
      ])
    }

    // for displaying server errors
    actions.push(tag('div', {class: 'error'}, []))

    return tag('div', {}, [
      tag('div', {class: 'map'}, []),
      tag('div', {class: 'feature'}, [
        'Welcome to',
        tag('br', '', []),

        name,
        dropdown,

        tag('br', '', []),
        tag('div', {class: 'actions'}, actions)
      ]),

      tag('div', {class: 'metadata'}, [
        tag('div', {class: 'address'}, [
          'Address:',
          tag('br', '', []),
          address
        ]),

        tag('div', {class: 'description'}, [
          'Description:',
          tag('br', '', []),
          description
        ])
      ])
    ])
  }

  /* Creates and returns an HTMLElement representing a tag of the given name.
   * attrs is an object, where the key-value pairs represent HTML attributes to
   * set on the tag. contents is an array of strings/HTMLElements (or just
   * a single string/HTMLElement) that will be contained within the tag.
   *
   * Examples:
   * tag('p', {}, 'A simple paragraph') => <p>A simple paragraph</p>
   * tag('a', {href: '/about'}, 'About') => <a href="/about">About</a>
   *
   * tag('ul', {}, tag('li', {}, 'First item')) => <ul><li>First item</li></ul>
   *
   * tag('div', {}, [
   *   tag('h1', {'class': 'headline'}, 'JavaScript'),
   *   ' is awesome, ',
   *   tag('span', {}, 'especially in CS42.')
   * ])
   * => <div>
   *      <h1 class="headline">JavaScript</h1>
   *      is awesome,
   *      <span>especially in CS42.</span>
   *    </div>
   */
  function tag(name, attrs, contents) {
    const element = document.createElement(name)
    for (const attrName in attrs) {
      element.setAttribute(attrName, attrs[attrName])
    }

    // If contents is a single string or HTMLElement, make it an array of one
    // element; this guarantees that contents is an array below.
    if (!(contents instanceof Array)) {
      contents = [contents]
    }

    contents.forEach(piece => {
      if (piece instanceof HTMLElement) {
        element.appendChild(piece)
      } else {
        // must create a text node for a raw string
        element.appendChild(document.createTextNode(piece))
      }
    })

    return element
  }

  window.Templates = Templates

})()
