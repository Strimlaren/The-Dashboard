# The Dashboard

### Code execution strengths

- I think my prototype functions get_obj() and set_obj() were a real time-saver, and
  made the localStorage experience a lot more straight forward. It contributes to
  less and cleaner, more readable code, which always helps me see what I need to see
  easier when working on other, more important stuff and solving problems. It could
  have been done with a regular function as well but I did it this way to help cement
  the knowledge, try things out and know I have done something like this somewhere,
  however simple it may seem, so I can go back to it and see how it's done, or even
  reuse the code straight up.
- My four create_xxxxx functions which I will also mention in the weaknesses section.
  Originally I did the standard eventlitsener on click anonymous callback function
  into the create_xxxxx code blocks. This works well when they are called by the user
  clicking on a button or triggering the function, where no arguments are being sent.
  Later, when I started implementing localStorage functionality for these modules
  (which I did later, and in retrospect maybe shouldn't have) I realized that when
  creating this content from storage, I all of a sudden couldn't use these functions
  because they were configured to not receive any parameters. Instead of duplicating
  the function, calling it something slightly differently, letting it receive
  parameters and reworking the inside, I wanted to reuse the same function for these
  two different needs. After some research into it, I realized you can have a function
  take parameters with default values when nothing is passed in. So i did it this
  way and reduced the amount of functions from 8 to 4. One of them gave me some
  interesting bugs which were very challenging to solve, so I'm thankful for that.
- I have done a good job trying to stay outside my comfort zone when it comes to
  some concepts and syntactical suger which I was a bit sceptical towards in the
  beginning becuase they looked and felt strange to me coming from other languages.
  Arrow functions and ternary operators in particular. I love them now. Instead of
  throwing a few lines of extra code to check a statement with an oldschool
  if-statement and then calling a function or creating a variable from that, just
  insert a ternary statement in the middle of another statement is so satisfying.
  Some say it's just syntactical sugar. Technically I agree, it can be written in
  several different, more roundabout ways, but it still saves potentially several
  lines of code and adds to the readability which I just love.
- I believe I have done a good job of reducing the code into functions in a
  logical manner. Sure functions are best used when repeat code can be avoided by
  creating a function that can be called a number of times instead of writing the
  same code repeatedly, but I believe they serve a great readability purpose by
  extracting pieces of code that have a specific tangible task. Load data from localStorage, then add_or_update_note, then save data to localStorage. Reading this
  I think you can instantly tell what that function is supposed to do, instead of
  getting smashed in the face with a wall of text in that second step, which would
  take you a few minutes to grasp. Instead, you instantly know what is going on and
  if you wish to know the intricacies of that functions, reading it you will already
  know what it should be doing, even before you start. This has helped me so many
  times in searching for bugs.
- I did an OK job with commenting, regular commits and good commit messages.
  I have a strong need for organizing and symmetry so I have been doing my best to
  keep the code clean with meaningful empty lines and placement of comments. This
  works against me as well sometimes, I have an OCD-like need to keep comments on
  one line to not make these large gaps in the code between two lines of code that
  make readability harder. So I can spend too much time trying to come up with
  short sentances that describe what is going on and why without distracting the
  eyes when they are just trying to make out the code.

### Code execution weaknesses

- Unnecessary overuse of event litseners on everything interactable. I could have
  used a generic event litsener on click and fetched the clicked object, checked
  what it was that was clicked, and then set whether or not something should happen,
  and what. Instead, I have an event litsener tied to a number of items that can
  potentially grow indefinitely in number. This could lead to performance issues, not
  to mention more code, more comments, and code that is harder to comprehend, navigate
  and read. In the future, this is something i wish to change.
- Perhaps overly complex and obtuse way of creating some of the content in JS.
  The create_weather_cards(), create_note(), create_link() and create_books()
  functions work and are fairly simple code to understand for anyone but there are
  other ways to save space, and do the same with fewer lines of code. Setting the
  entirety of the element creating, assigning of content, classes and other attributes
  could as well have been made with a simple .innerHTML template string. At the time
  I felt this was not possible because that would create issues with event litseners
  not tagging along, especially when reading content from memory and injecting html
  directly from a string inside of a localStorage variable. It would be much easier
  and faster but at the time i had no ideas of what to do with the event litseners.
  Now I believe there should be a way with generic event litseners, or perhaps some
  other solution I never thought of researching.
- Again, these four functions which in retrospect I strongly feel could be made into
  a one-size-fits-all function that further reduces the amount of repeat code. Even
  though I think my way is ok as well because I was working with a least valuable
  product mindset, I can't be completely satisified with something I know can be done
  better. Right now, this is out of my skill-level. I think.
- I'm not sure about my choice to give each "module" a script file of their own. My
  original idea was to keep everything organized and easy to find but this can result
  in frustrations. Also, I thought it would be a great idea to put all the
  loading-from-localStorage from all modules inside main.js but that also created a
  bit of annoying fragmentation of the code, and some errors. I could probably benefit
  in this regard refactoring the entire assignment into OOP, but I think that would be
  overkill considering eveything is done and working.
- In retrospect, writing this when everything is done, I can now identify several
  places where I could have used functions like .map() and probably several others
  if I dig hard enough. This could save some lines of code, improve readability, and
  maybe even some performance. Not that it would do much difference on a small app
  like this one, but for the future.
