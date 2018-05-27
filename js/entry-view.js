(function() {

  const EntryView = {}

  /* Renders an entry into the given entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  EntryView.render = (entryElement, activeEntryData) => {
    
    EntryModel.loadAll((error, entries) => {
  
      if (error) {
        console.log(error);
      } else {
        
        if (activeEntryData == null) {
          if (entries[0]) {
            activeEntryData = entries[0];
          } else {
            CreatingEntryView.render();
            return;
          }
        }
        const options = {
           viewing: true,
           entries: entries,
           activeEntryData: activeEntryData
         }
         const child = Templates.renderEntry(options)
         entryElement.appendChild(child)
         
         const className = child.getElementsByClassName("new");
         
         for (let i = 0; i < className.length; i++) {
           className[i].addEventListener("click", (e) => {
             e.preventDefault();
             console.log('blah')
             CreatingEntryView.render(entryElement);
           })
         }

      }
      
    });
    
  

  }

  window.EntryView = EntryView

})()
