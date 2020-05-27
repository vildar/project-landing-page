/**
* @description Represents a book
* @param {string} navEl - Id of the section to be scrolled to
*/
function scrollToElement(navEl){
    if(navEl != null){
        $("html, body").animate({ scrollTop: $(`#${navEl}`).offset().top }, 350);
    } else{
        $("html, body").animate({ scrollTop: 0 }, 350);
    }
}

//The list of elements in the navbar and 'section' tag are stored in navbar and sections respectively.
const navbar = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');

/**
* @description Dynamically builds the navbar elements
*/
function buildNavbar(){
    //First, add the 'heading' or the top of the page.
    const navbarElement = document.createElement('li');
    navbarElement.textContent = "Heading";
    navbarElement.className = "menu__link";
    navbar.appendChild(navbarElement);
    navbarElement.addEventListener('click', function(){
        scrollToElement();
    });

    //Adding the section elements.
    const count = sections.length;
    for(let i = 0; i < count; i++){
        const navElement = document.createElement('li');
        navElement.textContent = sections[i].getAttribute('data-nav');
        navElement.className = "menu__link";
        navbar.appendChild(navElement);
        navElement.addEventListener('click', function(){
            scrollToElement(sections[i].getAttribute('id'));
        });
    }
}

/**
* @description Changes active state of sections and menu elements based on scroll
*/
function changeActiveStateOnScroll(){
    $(window).on('scroll', function(){
        //Change active state if the page is at the top
        if($(window).scrollTop() === 0){
            navbar.childNodes[0].classList.add('activeNavElement');
            for(const navbarEl of navbar.childNodes){
                if(navbarEl !== navbar.childNodes[0]){
                    navbarEl.classList.remove('activeNavElement');
                }
            }
        } else{ //Change active state if the page is at one of the sections
            $('section').each(function() {
                if($(window).scrollTop() >= $(this).offset().top - 25) {
                    this.classList.add('activeSection');
                    for(const sect of sections){
                        if(this !== sect){
                            sect.classList.remove('activeSection');
                        }
                    }
                    for(const navbarEl of navbar.childNodes){
                        if(navbarEl.textContent === this.getAttribute('data-nav')){
                            navbarEl.classList.add('activeNavElement');
                        } else{
                            navbarEl.classList.remove('activeNavElement');
                        }
                    }
                }
            });
        }
    })
}

buildNavbar();
changeActiveStateOnScroll();