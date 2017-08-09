/********************* ANUJ SHARMA *********************/
window.onscroll = onScroll;
window.onresize = onResize;
String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

/********************* LOAD HEADER *********************/
loadHeader();

function loadHeader() {
    headerlinks = {
        "title": ["University of Florida", "University of Florida", "Institute of Food and Agricultural Sciences", "UF Department of Plant Pathology"],
        "links": ["http://ufl.edu/", "http://ufl.edu/", "http://ifas.ufl.edu/", "http://plantpath.ifas.ufl.edu/"]
    }
    obj('header')[0].innerHTML = "<div class='logo'></div>";
    for (i = 0; i < 4; i++) {
        obj('header')[0].getElementsByTagName('div')[0].innerHTML += "<a id=\"link" + i + "\" title=\"" + headerlinks.title[i] + "\" href=\"" + headerlinks.links[i] + "\" target=\"_blank\"></a>"
    }
}

/********************* LOAD FOOTER *********************/
loadFooter();

function loadFooter() {
    obj('footer')[0].innerHTML = "<p>Design by: Anuj Sharma</p>"
}
/********************* NAVIGATION *********************/
theme = document.querySelector("meta[name=theme-color]");
menus = obj('menu')[0].childNodes;
loadMenu();

function onScroll() {
    scrlThreshold = (window.innerWidth < 640) ? 140 : 170;
    if (window.pageYOffset > scrlThreshold) {
        obj('nav')[0].style.position = 'fixed';
        theme.setAttribute("content", '#f37021');
        obj('#backtotop').style.bottom = '20px';
        obj('header')[0].style.marginBottom = '50px';
    } else {
        obj('nav')[0].style.position = '';
        theme.setAttribute("content", '#00529b');
        obj('#backtotop').style.bottom = '-55px';
        obj('header')[0].style.marginBottom = '0px';
    }
}

function loadMenu() {
    datum = Object.keys(data);
    for (i = 1; i < datum.length; i++) obj('menu')[0].innerHTML += '<span>' + datum[i].toTitleCase() + '</span>';
    for (i = 0; i < menus.length; i++) menus[i].addEventListener('click', doScroll.bind(null, '#' + menus[i].textContent.toLowerCase(), 1500));
}

obj('search')[0].innerHTML = "<input type='text' id='sbox' placeholder='Type to search' autocomplete='off' oninput='search.apply(this.value);'><span id='scount'></span><div><span onclick='search.donav(-1)'>❮</span><span onclick='search.donav(1)'>❯</span><span onclick=' search.clear();'>✖</span></div>";

/********************* BANNER *********************/
var b1, b2, bcap, blink, bcount, slidecount;
obj('banner')[0].onmouseover = function () {
    clearInterval(s)
}
obj('banner')[0].onmouseout = function () {
    slideAuto();
}
loadBanner();

function loadBanner() {
    obj('banner')[0].innerHTML += "<div><p></p></div><div><p></p></div><div></div>";
    b1 = obj('banner')[0].getElementsByTagName('div')[0];
    b2 = obj('banner')[0].getElementsByTagName('div')[1];
    b3 = obj('banner')[0].getElementsByTagName('div')[2];
    bcap1 = b1.childNodes[0];
    bcap2 = b2.childNodes[0];
    bcap1.setAttribute('class', 'noSelect');
    bcount = 0;
    fillBanner(b1, bcap1, data.slider[bcount]);
    for (i = 0; i < data.slider.length; i++) {
        b3.innerHTML += "<span onclick='slideTo(" + i + ")'></span>"
    }
    slidecount = b3.getElementsByTagName('span');
    slidecount[0].style.borderWidth = "7px";
    slideAuto();
}

function fillBanner(wrap1, wrap2, subdata) {
    wrap1.style.backgroundImage = 'url(' + subdata.image + ')';
    wrap2.style.display = (subdata.caption) ? 'block' : 'none';
    if (subdata.caption) wrap2.textContent = subdata.caption;
    b1.onclick = function () {
        if (subdata.link) {
            window.open(subdata.link);
        }
    }

}

function slideAuto() {
    s = setInterval(function () {
        bcount++;
        if (bcount == data.slider.length) bcount = 0;
        slideTo();
    }, 4000);
}

function slideTo(num) {
    if (num == bcount) return;
    if (typeof num === 'number') {
        bcount = num;
    }
    back = data.slider[bcount];
    if (back.image) {
        fillBanner(b2, bcap2, data.slider[bcount]);
        for (i = 0; i < slidecount.length; i++) slidecount[i].style.borderWidth = (bcount == i) ? "7px" : "2px";
        l = 0;
        t = setInterval(function () {
            b1.style.marginLeft = '-' + l + '%';
            if (l >= 100) {
                fillBanner(b1, bcap1, data.slider[bcount]);
                clearInterval(t);
                b1.style.marginLeft = 0;
            }
            l++;
        }, 5);
    }
}

/********************* MAIN *********************/
loadMain();

function loadMain() {
    datum = Object.keys(data);
    for (i = 1; i < datum.length; i++) obj('main')[0].innerHTML += '<section id=' + datum[i] + '><h1>' + datum[i].toTitleCase() + '</h1></section>';
    loadAbout();
    loadTeam();
    loadResearch();
    loadPublication();
    loadGallery();
    loadBlog();
    loadLinks();
}
/********************* ABOUT *********************/
function loadAbout() {}
/********************* TEAM *********************/
function loadTeam() {
    for (i = 0; i < data.team.length; i++) {
        datum = data.team[i];
        if (datum.name) {
            tClass = (datum.description) ? '' : 'nodesc';
            tDesc = (datum.description) ? '<div class="tdesc large">' + adjText(datum.description) + '</div>' : '';
            obj('#team').innerHTML += "<div class='twrap " + tClass + "'><div class='tcol'>" + tPic(datum.nation, datum.image) + tBio(datum.name, datum.level, datum.since, datum.email, datum.phone, datum.website, datum.articles, datum.resume) + "</div>" + tDesc + "</div>";
        }
    }
}

function tPic(nation, image) {
    html = ''
    if (image) {
        html1 = (nation) ? "<div class='tflag " + nation + "'></div>" : "";
        html = "<div class='tpicframe'><div><div class='tpic' style='background-image: url(" + image + ")'>" + html1 + "<div class='tpin'></div></div></div></div>";
    }
    return html
}

function tBio(name, level, since, email, phone, site, article, resume) {
    html = '', html5 = '';
    if (name) {
        html1 = (since) ? " since " + since : "";
        html2 = (email) ? "<p>Email: <a href='mailto:" + email + "' target='_blank'>" + email + "</a></p>" : "";
        html3 = (phone) ? "<p>Phone: <a href='tel:" + phone.replace(/ /g, '') + "' target='_blank'>" + phone + "</a></p>" : "";
        html4 = (site) ? "<p>Website: <a href='" + site + "' target='_blank'>" + site.replace('http://', '').replace('https://', '') + "</a></p>" : "";
        if (article || resume) {
            html51 = (article) ? "<a href='" + article + "'>Publications</a>" : "";
            html52 = (article && resume) ? " | " : "";
            html53 = (resume) ? "<a href='" + resume + "'>Resume</a>" : "";
            html5 = "<p>" + html51 + html52 + html53 + "</p>";
        }
        html = "<div class='tbio'><div><h2>" + name + "</h2><p>" + level + html1 + "</p>" + html2 + html3 + html4 + html5 + "</div></div>";
    }
    return html;
}
/********************* RESEARCH *********************/
function loadResearch() {
    for (i = 0; i < data.research.length; i++) {
        datum = data.research[i];
        rPic = (datum.image) ? "<div class='rpic'><img src='" + datum.image + "'></div>" : "";
        rClass = (datum.description) ? '' : 'nodesc';
        rDesc = (datum.description) ? "<div class='rdesc large'>" + adjText(datum.description) + "</div>" : "";
        if (datum.title) obj('#research').innerHTML += "<div class='rwrap " + rClass + "'><h2 class='rtitle'>" + datum.title + "</h2>" + rMember(datum.members) + rPic + rDesc + "</div>";
    }
}

function rMember(member) {
    html = '';
    if (member && member.length) {
        if (typeof member === 'string') member = [member];
        list = '', pref = (member.length > 1) ? 'Members: ' : 'Member: ';
        for (j = 0; j < member.length; j++) {
            list += member[j] + ', ';
        }
        html = "<p>" + pref + list.slice(0, -2) + "</p>"
    }
    return html;
}
/********************* PUBLICATION *********************/
function loadPublication() {
    for (i = 0; i < data.publication.length; i++) {
        datum = data.publication[i];
        if (datum.title) obj('#publication').innerHTML += "<div class='pwrap'><h2>" + datum.title + "</h2>" + pAuthor(datum.authors) + pPublish(datum.journal, datum.issue, datum.series, datum.pagerange) + pAction(datum.citation, datum.abstract) + "</div>";
    }
}

function pAuthor(author) {
    html = '';
    if (author && author.length) {
        if (typeof author === 'string') author = [author];
        list = '';
        for (j = 0; j < author.length; j++) {
            if (author[j].slice(0, 1) == "*") author[j] = "<b>" + author[j].substr(1) + "</b>";
            list += author[j] + ', ';
        }
        html = "<p>Authors: " + list.slice(0, -2) + "</p>"
    }
    return html
}

function pPublish(journal, issue, series, pages) {
    html = '';
    html1 = (issue) ? ", Vol " + issue : "";
    html2 = (issue && series) ? "(" + series + ")" : "";
    html3 = (issue && pages) ? ", pages " + pages : "";
    html = (journal) ? "<p>Published in: " + journal + html1 + html2 + html3 + ".</p>" : "";
    return html;
}

function pAction(cite, url) {
    html = '';
    html1 = (cite) ? "<button class='left' onclick= 'clipBoard(\"" + cite + "\");'>Cite</button>" : "";
    html2 = (url) ? "<button class='right' onclick='window.open(\"" + url + "\")'>View</button>" : "";
    btnClass = (url && cite) ? 'dblbtn' : '';
    html = (url || cite) ? "<div class='pbtngroup " + btnClass + "'>" + html1 + html2 + "</div>" : "";
    return html;
}

function clipBoard(text) {
    obj('textarea')[0].textContent = text;
    obj('textarea')[0].select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Following citation has copied to clipboard:\n' + text)
}
/********************* GALLERY *********************/
function loadGallery() {
    var galleryHTML = '';
    for (i = 0; i < data.gallery.length; i++) {
        datum = data.gallery[i];
        if (datum.thumb || datum.src) {
            gThumb = (datum.thumb) ? "src='" + datum.thumb + "'" : "src='" + datum.src + "'";
            galleryHTML += "<div class='gpic'><div class='spinner'></div><img " + gThumb + ">" + gFace(datum.title, datum.src, datum.type, datum.credit) + "</div>";
        }
    }
    obj('#gallery').innerHTML += "<div class='gwrap noSelect'>" + galleryHTML + "</div>";
    picLoader();
}

function gFace(title, src, type, credit) {
    html = '', html3 = '';
    html1 = (type) ? "class='" + type + "'" : "class='photo'";
    html2 = (src) ? html1 + "' onclick='window.open(\"" + src + "\")'" : "";
    if (title || credit) {
        html31 = (title) ? title : "";
        html32 = (title && credit) ? "<br>" : "";
        html33 = (credit) ? "<small>Credit: " + credit + "</small>" : "";
        html3 = "<p>" + html31 + html32 + html33 + "</p>";
    }
    html = "<face " + html2 + ">" + html3 + "</face>"
    return html;
}

function picLoader() {
    for (i = 0; i < obj('.gpic').length; i++) {
        obj('.gpic')[i].childNodes[1].onload = function () {
            this.parentNode.childNodes[0].remove();
            imgClass = (this.width > this.height) ? 'wide' : 'tall';
            this.setAttribute('class', imgClass);
            this.style.display = 'block';
        }
    }
}
/********************* BLOG *********************/
function loadBlog() {
    for (i = 0; i < data.blog.length; i++) {
        datum = data.blog[i];
        bTitle = (datum.title) ? "<h2 class='btitle'>" + datum.title + "</h2>" : "";
        bPic = (datum.image) ? "<div class='bpic'><img src='" + datum.image + "'></div>" : "";
        bClass = (datum.description) ? '' : 'nodesc';
        bDesc = (datum.description) ? "<div class='bdesc large'>" + adjText(datum.description) + "</div>" : "";
        if (datum.title) obj('#blog').innerHTML += "<div class='bwrap " + bClass + "'>" + bTitle + bAuthor(datum.authors) + bPic + bDesc + "</div>";
    }
}

function bAuthor(author) {
    html = '';
    if (author && author.length) {
        if (typeof author === 'string') author = [author];
        list = '';
        for (j = 0; j < author.length; j++) {
            list += author[j] + ', ';
        }
        html = "<p>By: " + list.slice(0, -2) + "</p>"
    }
    return html;
}
/********************* LINKS *********************/
function loadLinks() {
    for (i = 0; i < data.links.length; i++) {
        group = data.links[i];
        if (group.list.length > 0) {
            grouphtml = '';
            for (j = 0; j < group.list.length; j++) {
                datum = group.list[j];
                if (!datum.desc) datum.desc = '';
                if (datum.title && datum.link) grouphtml += "<li><a href='" + datum.link + "'>" + datum.title + "</a>" + datum.desc + "</li>"
            }
            if (grouphtml) obj('#links').innerHTML += "<div class='lwrap'><h2>" + group.name + "</h2><ol>" + grouphtml + "</ol></div>";
        }
    }
}
/********************* PRELOADER / CLEANER *********************/
window.onload = function () {
    obj('body')[0].style.overflow = 'auto';
    for (i = 0; i < obj('img').length; i++) {
        obj('img')[i].onerror = function () {
            this.style.display = "none";
            this.parentNode.remove();
        }
    }
    obj('loader')[0].style.display = 'none';
}
/********************* SEARCH *********************/
var search = new search();
obj('#sopen').onclick = function () {
    if (!scheck.checked) setTimeout(function () {
        obj('#sbox').focus()
    }, 400);
}

function search() {
    var skipTags = new RegExp("^(?:HL|SCRIPT|FORM|SPAN)$");
    var matchRegex = "";
    var count = 0;
    var position = 0;
    var endCharRegex = new RegExp("^[^\\\w]+|[^\\\w]+$", "g");
    var breakCharRegex = new RegExp("[^\\\w'!@.#%^&*-_=+<>?/\"]+ ", "g");
    //
    this.setRegex = function (input) {
        input = input.replace(endCharRegex, "").replace(breakCharRegex, "|").replace(/^\||\|$/g, "");
        if (input) {
            matchRegex = new RegExp("\\b(" + input + ")", "i");
            return true;
        }
        return false;
    };
    //
    this.getRegex = function () {
        var retval = matchRegex.toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "").replace(/\|/g, " ");
        return retval;
    };
    //
    this.apply = function (input) {
        count = 0;
        this.remove();
        if (input === undefined || !input) {
            this.remove();
            return;
        };
        if (this.setRegex(input)) {
            this.colorit(obj('main')[0]);
        }
        obj('#scount').textContent = count + ' match';
        if (count != 1) obj('#scount').textContent += 'es';
        obj('search')[0].getElementsByTagName('div')[0].style.opacity = '1';
    };
    //
    this.colorit = function (node) {
        if (node === undefined || !node) return;
        if (!matchRegex) return;
        if (skipTags.test(node.nodeName)) return;
        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++) this.colorit(node.childNodes[i]);
        }
        if (node.nodeType == 3) {
            if ((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
                var match = document.createElement("HL");
                match.appendChild(document.createTextNode(regs[0]));
                count++;
                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        };
    };
    //
    this.remove = function () {
        while (obj("HL").length && (el = obj("HL")[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
        obj('#scount').textContent = '';
        position = 0;
        obj('search')[0].getElementsByTagName('div')[0].style.opacity = '0';
    };
    //
    this.clear = function () {
        obj('#sbox').value = "";
        this.remove();
        obj('#sbox').focus();
    };
    //
    this.donav = function (offset) {
        obj('#sbox').focus();
        arr = obj('main')[0].getElementsByTagName("HL");
        if (!arr.length) return;
        position += offset;
        if (position <= 0) position = arr.length;
        if (position >= arr.length + 1) position = 1;
        for (i = 0; i < arr.length; i++) {
            arr[i].style.background = (position - 1 == i) ? "#ff9632" : "yellow";
            sactive = (position - 1 == i) ? "sactive" : "";
            arr[i].setAttribute('id', sactive);
        }
        doScroll('#sactive');
        obj('#scount').textContent = position + ' of ' + count;
    };
}
/********************* SMOOTH SCROLL *********************/
function doScroll(element) {
    var startingY = window.pageYOffset;
    elementY = (typeof element === 'number') ? element : window.pageYOffset + document.querySelector(element).getBoundingClientRect().top - 50;
    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
    var diff = targetY - startingY;
    var easing = function (t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    var start
    if (!diff) return;
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        var time = timestamp - start;
        var percent = Math.min(time / 1500, 1);
        percent = easing(percent);
        window.scrollTo(0, startingY + diff * percent);
        if (time < 1500) {
            window.requestAnimationFrame(step);
        };
    });
};

/********************* TEXT TRUNCATE *********************/
function onResize() {
    for (i = 0; i < obj('.large').length; i++) {
        hidden = obj('.large')[i].getElementsByTagName('hidden')[0];
        if (hidden) {
            obj('.large')[i].innerHTML = adjText(hidden.innerHTML);
        }
    }
}

function adjText(desc) {
    if (desc.length > 300) {
        if (window.innerWidth < 640) {
            desc = desc.slice(0, 200) + desc.slice(200, 250).split(' ')[0] + "...<button onclick = 'this.closest(\".large\").innerHTML = this.closest(\".large\").getElementsByTagName(\"hidden\")[0].innerHTML'>Read more</button><hidden>" + desc + "</hidden>";
        } else {
            desc = desc + "<hidden>" + desc + "</hidden>";
        }
    }
    return desc;
}

/********************* ELEMENT RELATON FUNCTION *********************/
function obj(str) {
    if (str.slice(0, 1) == '.') {
        html = document.getElementsByClassName(str.substr(1));
    } else if (str.slice(0, 1) == '#') {
        html = document.getElementById(str.substr(1));
    } else {
        html = document.getElementsByTagName(str);
    }
    return html
}
