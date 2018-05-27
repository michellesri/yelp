(function() {

  const MainView = {}

  /* Renders the main area, showing entries. */
  MainView.render = body => {
    const entry = body.querySelector('#entry')
    EntryView.render(entry, null)
  }

  window.MainView = MainView

})()
