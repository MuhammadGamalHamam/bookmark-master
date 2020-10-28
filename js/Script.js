var siteName = document.getElementById('siteName');
var urlName = document.getElementById('urlName');
var submit = document.getElementById('submit');
submit.addEventListener('click', addWebSite);

var bookMarkList;

if (localStorage.getItem("site") == null) {
    bookMarkList = [];
}
else {

    bookMarkList = JSON.parse(localStorage.getItem("site"));
    displayList(bookMarkList);
}

function addWebSite() {
    var errorName = document.getElementById('errorName');
    var errorUrl = document.getElementById('errorUrl');
    var webSite = { name: siteName.value, url: urlName.value }

    if (siteName.value != "" && urlName.value != "") {
        bookMarkList.push(webSite);
        localStorage.setItem("site", JSON.stringify(bookMarkList));
        errorName.style.display = 'none';
        errorUrl.style.display = 'none';
        clrForm();
    }
    else {
        if (siteName.value == "") {
            document.getElementById('errorName').innerHTML = 'Name is required';
            errorName.style.display = 'block';
        }
        if (urlName.value == "") {
            document.getElementById('errorUrl').innerHTML = 'URL is required';
            errorUrl.style.display = 'block';
        }
    }
    displayList(bookMarkList)
}

function displayList(arr) {
    siteList = "";
    for (var i = 0; i < arr.length; i++) {
        siteList +=
            `<tr>
                <td>${i+1}</td>
                <td><h4>${arr[i].name}</h4></td>
                <td>
                <a href="${arr[i].url}" class="btn btn-success shadow" target="_blank">Visit</a>
                <button onclick="delSite(${i})" class="btn btn-danger shadow">Delete</button>
                </td>
            </tr>`
    }
    document.getElementById("body-table").innerHTML = siteList;
}

function clrForm() {
    siteName.value = "";
    urlName.value = "";
}

function delSite(index) {
    bookMarkList.splice(index, 1)
    localStorage.setItem("site", JSON.stringify(bookMarkList));
    displayList(bookMarkList);
}