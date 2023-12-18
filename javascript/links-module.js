// Default values will be used if user creates new link
function create_link(name = 0, url = 0, user_call = true) {
  // Check how function was called. User or browser (re)loaded?
  const link_name = name === 0 ? user_link_name.value : name;
  const link_url = url === 0 ? user_link_url.value : url;

  // Make sure user actually entered both a name and url
  if (link_name === "" || link_url === "") {
    announcer.innerText = "Field(s) empty!";
    return;
  }
  // Create all elements and append them all
  const link_card = new_element("div", "", "link-card");
  const the_link = new_element("a", "");
  the_link.href = format_link(link_url);
  the_link.target = "_blank";
  const link_div = new_element("div", "", "link-div");
  const favicon = new_element("img", "", "link-img");
  favicon.alt = "link favicon";
  favicon.src = `https://s2.googleusercontent.com/s2/favicons?domain=${format_link(
    link_url
  )}`;
  const h5 = new_element("h5", link_name);
  const remove_button = new_element("img", "", "remove-link-btn");
  remove_button.src = "./images/close.svg";
  remove_button.alt = "link remove button";

  remove_button.addEventListener("click", () => {
    let links_data = localStorage.get_obj("linksData");
    // Go though data and remove link that corresponds to this one
    const new_links_data = links_data.filter(
      (obj) => obj.name !== link_name && obj.url !== link_url
    );
    localStorage.set_obj("linksData", new_links_data);
    // Remove the link from module
    link_card.remove();
  });

  link_div.append(favicon);
  link_div.append(h5);
  the_link.append(link_div);
  link_card.append(the_link);
  link_card.append(remove_button);
  link_list.append(link_card);

  /* Only save the link if this function was called by the user. Otherwise 
  the loading of the page will create another link each time it uses this 
  function to recreate a link from memory. */
  if (user_call) save_link(link_name, link_url);
  // Reset form and error prompt before closing modal
  user_link_name.value = "";
  user_link_url.value = "";
  announcer.innerText = "";
  // If the function is called by user adding a new link, toggle the modal. If it is called by opening the page and rendering the saved links, dont toggle modal
  if (user_call) toggle_quicklinks();
}

// Save link to localStorage
function save_link(my_name, my_url) {
  let links_data = localStorage.get_obj("linksData");
  links_data.push({ name: my_name, url: format_link(my_url) }),
    localStorage.set_obj("linksData", links_data);
}
// Super basic making sure user gave a proper url format
function format_link(link) {
  if (!link.includes("www")) link = `www.${link}`;
  if (!link.includes("https://")) link = `https://${link}`;
  return link;
}

// Toggling between front and back of quick-links module
function toggle_quicklinks() {
  if (quicklinks_module.style.display === "none") {
    quicklinks_module.style.display = "flex";
    quicklinks_back_module.style.display = "none";
  } else {
    quicklinks_module.style.display = "none";
    quicklinks_back_module.style.display = "flex";
  }
}
