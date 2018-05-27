(function() {

  const EntryModel = {}

  const ENTRIES_URL = '/entries'
  const STATUS_OK = 200

  /* Loads all entries from the server.
   *
   * Calls: callback(error, entries)
   *  error -- the error that occurred or NULL if no error occurred
   *  entries -- an array of entries
   */
  EntryModel.loadAll = callback => {
    
    const request = new XMLHttpRequest()
    request.addEventListener('load', () => {
      console.log(request.responseText)
      if(request.status == STATUS_OK){

        const entries = JSON.parse(request.responseText)
        
        callback(null, entries)
      
      } else{
        callback(request.responseText)
      }
    })

    request.open('GET', '/entries')
    request.send()

  }

  /* Adds the given entry to the list of entries. The entry must *not* have
   * an id associated with it.
   *
   * Calls: callback(error, entry)
   *  error -- the error that occurred or NULL if no error occurred
   *  entry -- the entry added, with an id attribute
   */
  EntryModel.add = (entry, callback) => {
    const request = new XMLHttpRequest()
    
    const params = entry;
    request.open('POST', '/entries')

    
    request.addEventListener('load', () => {
      console.log(request.responseText)
      if(request.status == STATUS_OK){

        const entries = JSON.parse(request.responseText)
        
        callback(null, entries)
      
      } else{
        callback(request.responseText)
      }
    })
    
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify(params));


  }

  /* Updates the given entry. The entry must have an id attribute that
   * identifies it.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */
  EntryModel.update = (entry, callback) => {
    
    const request = new XMLHttpRequest()
    
    const params = entry;
        
    const id = entry.id;
    
    console.log("id: " + id);
    
    request.addEventListener('load', () => {
      console.log(request.responseText)
      if(request.status == STATUS_OK){

        const entries = JSON.parse(request.responseText)
        
        callback(null, entries)
      
      } else{
        callback(request.responseText)
      }
    })
    
    request.open('POST', '/entries/' + id);

    
    request.setRequestHeader('Content-type', 'application/json');

    request.send(JSON.stringify(params));
    
  }

  /* Deletes the entry with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or NULL if no error occurred
   */
  EntryModel.remove = (id, callback) => {
    
    const request = new XMLHttpRequest()
        
    request.addEventListener('load', () => {
      console.log(request.responseText)
      if(request.status == STATUS_OK){

        const entries = JSON.parse(request.responseText)
        
        callback(null, entries)
      
      } else{
        callback(request.responseText)
      }
    })
    
    request.open('POST', '/entries/' + id + '/delete')

    
    request.setRequestHeader('Content-type', 'application/json')

    request.send(JSON.stringify(id))
    
  }

  window.EntryModel = EntryModel

})()
