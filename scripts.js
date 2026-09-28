function save_options() {

  var select = document.getElementsByName("font_name");
  var fontname = select.item(0).value;

  chrome.storage.sync.set({'fontname': fontname}, function() {
    console.log('fontname is set to ' + fontname);
  });

  var status = document.getElementById("status");
  status.innerHTML = "Options Saved. Refresh the page to see the change.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 1500);

}

function restore_options() {

  chrome.storage.sync.get(['fontname'], function(items) {
    var input = document.getElementById("font_name");

    if (input) {
      input.value = items.fontname;
    }

  });

}

function exclude_current_site() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      var currentUrl = new URL(tabs[0].url);
      var domain = currentUrl.hostname;
      
      chrome.storage.sync.get(['excluded_sites'], function(items) {
        var excludedSites = items.excluded_sites || [];
        
        if (!excludedSites.includes(domain)) {
          excludedSites.push(domain);
          chrome.storage.sync.set({'excluded_sites': excludedSites}, function() {
            var excludeStatus = document.getElementById("exclude-status");
            excludeStatus.innerHTML = "Site excluded: " + domain;
            setTimeout(function() {
              excludeStatus.innerHTML = "";
            }, 2000);
            display_excluded_sites();
          });
        } else {
          var excludeStatus = document.getElementById("exclude-status");
          excludeStatus.innerHTML = "Site already excluded: " + domain;
          setTimeout(function() {
            excludeStatus.innerHTML = "";
          }, 2000);
        }
      });
    }
  });
}

function display_excluded_sites() {
  chrome.storage.sync.get(['excluded_sites'], function(items) {
    var excludedSites = items.excluded_sites || [];
    var container = document.getElementById("excluded-sites-container");
    
    if (excludedSites.length === 0) {
      container.innerHTML = "<p>No sites excluded</p>";
      return;
    }
    
    container.innerHTML = "";
    excludedSites.forEach(function(site) {
      var siteDiv = document.createElement("div");
      siteDiv.className = "excluded-site";
      siteDiv.innerHTML = site + 
        '<button class="remove-site" data-site="' + site + '">Remove</button>';
      container.appendChild(siteDiv);
    });
    
    // Add event listeners to remove buttons
    var removeButtons = document.querySelectorAll('.remove-site');
    removeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        var siteToRemove = this.getAttribute('data-site');
        remove_excluded_site(siteToRemove);
      });
    });
  });
}

function remove_excluded_site(site) {
  chrome.storage.sync.get(['excluded_sites'], function(items) {
    var excludedSites = items.excluded_sites || [];
    var updatedSites = excludedSites.filter(function(s) { return s !== site; });
    
    chrome.storage.sync.set({'excluded_sites': updatedSites}, function() {
      display_excluded_sites();
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restore_options();
  display_excluded_sites();
});

document.addEventListener('DOMContentLoaded', function() {
  var link = document.getElementById("click-this");
  if (link != undefined) {
    link.addEventListener('click', function() {save_options();});
  }
  
  var excludeButton = document.getElementById("exclude-current-site");
  if (excludeButton != undefined) {
    excludeButton.addEventListener('click', function() {exclude_current_site();});
  }
});