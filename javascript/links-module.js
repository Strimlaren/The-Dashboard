const add_link_button = document.querySelector(".add-link");
const link_list = document.querySelector(".quick-links");
const user_link_name = document.querySelector("#link-name");
const user_link_url = document.querySelector("#website-link");
const announcer = document.querySelector(".announcer");

add_link_button.addEventListener("click", () => {
  create_link();
});

function create_link(
  name = user_link_name.value,
  url = user_link_url.value,
  toggle = true
) {
  // Make sure user actually entered both a name and url
  if (name === "" || url === "") {
    announcer.innerText = "Field(s) empty!";
    return;
  }
  // Create all elements and append them all
  const link_card = new_element("div", "", "link-card");
  const the_link = new_element("a", "");
  the_link.href = format_link(url);
  the_link.target = "_blank";
  const link_div = new_element("div", "", "link-div");
  const favicon = new_element("img", "", "link-img");
  favicon.alt = "link favicon";
  favicon.src = `https://s2.googleusercontent.com/s2/favicons?domain=${url}`;
  const h5 = new_element("h5", name);
  const remove_button = new_element("img", "", "remove-link-btn");
  remove_button.src = "./images/close.svg";
  remove_button.alt = "link remove button";
  remove_button.addEventListener("click", () => {
    link_card.remove();
  });

  link_div.append(favicon);
  link_div.append(h5);
  the_link.append(link_div);
  link_card.append(the_link);
  link_card.append(remove_button);
  link_list.append(link_card);

  let links_data = localStorage.get_obj("linksData");
  links_data.push({ name: user_link_name.value, url: user_link_url.value });
  localStorage.set_obj("linksData", links_data);

  // Reset form and error prompt before closing modal
  user_link_name.value = "";
  user_link_url.value = "";
  announcer.innerText = "";

  if (toggle) toggle_modal();
}

// Super basic making sure user gave a proper url format
function format_link(link) {
  if (!link.includes("www")) link = `www.${link}`;
  if (!link.includes("https://")) link = `https://${link}`;

  return link;
}

//       <div class="link-card">
//         <a href="${user_link_url.value}" target="_blank>
//           <div class="link-div">
//             <img src="https://s2.googleusercontent.com/s2/favicons?domain=${user_link_url.value}" alt="link favicon"
//               class="link-img">
//             <h5>${user_link_name.value}</h5>
//           </div>
//         </a>
//         <img src="./images/close.svg" alt="link remove button" class="remove-link-btn">
//       </div>;
