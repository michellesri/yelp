(function() {

  const EntryView = {}

  /* Renders an entry into the given entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  EntryView.render = (entryElement, activeEntryData) => {
    
    EntryModel.loadAll((error, entries) => {
      
      console.log("entries: " , entries)
  
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
         console.log("entryElement: " , entryElement)
         entryElement.appendChild(child)
         
         const classNew = child.getElementsByClassName("new")
         classNew[0].addEventListener("click", (e) => {
           e.preventDefault()
           CreatingEntryView.render(entryElement)
         })
         
         const classEdit = child.getElementsByClassName("edit")
         classEdit[0].addEventListener("click", (e) => {
           e.preventDefault()
           EditingEntryView.render(entryElement)
         })
         
         const classDelete = child.getElementsByClassName("delete")
         classDelete[0].addEventListener("click", (e) => {
           e.preventDefault()
           
           const classError = document.getElementsByClassName("error")
           EntryModel.remove(activeEntryData.id, (error, entries) => {
             if (error) {
               classError[0].innerHTML = error
             } else {
               entryElement.innerHTML = ""
               if (entries.length > 0) {
                 EntryView.render(entryElement, entries[0])
               } else {
                 CreatingEntryView.render()
               }
             }
           })
         })
         
         var selectTag = child.getEleme
         ntsByTagName("select")
         selectTag[0].addEventListener("change", (error, entries) => {
           entryElement.innerHTML = ""          
           console.log("selectTag: " , selectTag)
           EntryView.render(entryElement, selectTag[0].value)
         })
         
         
      }
      
    });
    
  

  }

  window.EntryView = EntryView

})()
