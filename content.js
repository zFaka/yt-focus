var home = document.querySelector("ytd-browse.ytd-page-manager[page-subtype='home']");

if (home != null) {
    home.innerHTML = `<div class='ytl-home'>
                <div class='ytl-home-sidebar'></div>

                <div class='ytl-container'>
                    <div class='ytl-home-grid'>


                        <a href='https://www.youtube.com/feed/subscriptions'><div class='ytl-home-grid-item'>
                                <div class='ytl-home-grid-item-text'><span>Subscriptions</span></div>
                        </div></a>


                        <a href='https://www.youtube.com/playlist?list=WL'><div class='ytl-home-grid-item'>
                                <div class='ytl-home-grid-item-text'><span>Watch Later</span></div>
                        </div></a>


                        <a href='https://www.youtube.com/feed/library'><div class='ytl-home-grid-item'>
                                <div class='ytl-home-grid-item-text'><span>Library</span></div>
                        </div></a>
                    </div>
                </div>
            </div>`;
}

chrome.storage.sync.get({
    comments: false,
    notifications: false,
    upload: false
}, function (settings) {    
    if (settings.upload){
        addShow("#buttons ytd-topbar-menu-button-renderer:nth-of-type(1)");
    }

    if (settings.notifications){
        addShow("#buttons ytd-notification-topbar-button-renderer.ytd-masthead");
    }

    if (settings.comments){
        addShow("ytd-comments#comments");
    }
});

function addShow(selector){
    item = document.querySelector(selector);
    if (item != null) {
        console.log(item);
        item.className += " ytl-show";
    }
    else{
        document.arrive(selector, function(el){
            console.log(el);
            el.className += " ytl-show";
        })
    }
}

var navbar = document.querySelector(".ytd-masthead#container");

if (navbar != null){
    insertNavbar(navbar);
}
else{
    document.arrive(".ytd-masthead#container", function () {
        insertNavbar();
    })
}

function insertNavbar(currNavbar = null){
    if (currNavbar == null){
        currNavbar = document.querySelector(".ytd-masthead#container");
    }

    currNavbar.insertAdjacentHTML("afterbegin", `
        <div class='ytl-nav'>
<!--        
            <div class='ytl-nav-menu'>
                <a href='https://www.youtube.com/'><div class='ytl-nav-item'><span>Home</span></div></a>
            </div>
            <label for='ytl-nm'><yt-icon icon="yt-icons:menu"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope yt-icon">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" class="style-scope yt-icon"></path>
      </g></svg></yt-icon></label>
      -->

        </div>
    `);
}

menuShow = false;

document.addEventListener("click", function(el){
    icon = document.querySelector(".ytl-nav yt-icon");
    if (el.target == icon){
        menuShow = !menuShow;
        document.querySelector(".ytl-nav-menu").classList.toggle("ytl-show");
    }
    else if (menuShow){
        menuShow = false;
        document.querySelector(".ytl-nav-menu").classList.remove("ytl-show");
    }
})
