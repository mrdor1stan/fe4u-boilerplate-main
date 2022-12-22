import {randomUserMock} from './FE4U-Lab3-mock.js';
import {additionalUsers} from './FE4U-Lab3-mock.js';

let courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry',
    'Law', 'Art', 'Medicine', 'Statistics'];

function randomCourse() {
    return rand(courses);
}

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomNote(full_name, course) {
    let phrases = ["Choose me because of my unique teaching strategy", "Good morning!", "Excited about our further partnership", "Email me if you have any questions", "I'm " + full_name + " and I'm certified " + course + " Teacher of The Year " + Number(Number(Math.floor(Math.random() * 10)) + Number(2012))];
    return rand(phrases);
}

let id = 12206461;

function getUsersArray(array) {
    let users = [];
    for (let i = 0; i < array.length; i++) {
        var favorite = array[i].favorite === false ? false : array[i].favorite || rand([false, true]);
        var bg_color = array[i].bg_color || "#" + Math.floor(Math.random() * 16777215).toString(16);
        var course = array[i].course || randomCourse();
        var note = array[i].note || randomNote(array[i].name.first + ' ' + array[i].name.last, course);
        users.push({
                "id": id++,
                "favorite": favorite,
                "bg_color": bg_color,
                "course": course,
                "note": note,

                "gender": array[i].gender,
                "title": array[i].name.title,
                "full_name": array[i].name.first + ' ' + array[i].name.last,
                "city": array[i].location.city,
                "state": array[i].location.state,
                "country": array[i].location.country,
                "postcode": array[i].location.postcode,
                "coordinates": {
                    "latitude": array[i].location.coordinates.latitude,
                    "longitude": array[i].location.coordinates.longitude
                },
                "timezone": {
                    "offset": array[i].location.timezone.offset,
                    "description": array[i].location.timezone.description
                },
                "email": array[i].email,
                "b_date": array[i].dob.date,
                "age": array[i].dob.age,
                "phone": array[i].phone,
                "picture_large": array[i].picture.large,
                "picture_thumbnail": array[i].picture.thumbnail
            }
        )
    }
    return users;
}

function task1() {
    let users = getUsersArray(randomUserMock);
    let addUsers = additionalUsers.filter((ar => !users.find(rm => (ar.phone === rm.phone && ar.email === rm.email))));
    let withAdditionalUsers = [...users, ...addUsers];
    withAdditionalUsers = withAdditionalUsers.filter((el) => isValid(el));
    return withAdditionalUsers;
}


function isValid(teacher) {


    var firstCapitalLetter = new RegExp("^([A-Z].*)$");
    if (teacher.b_date !== "" && teacher.course !== "choose")
        if (/*firstCapitalLetter.test(teacher.note) &&*/ firstCapitalLetter.test(teacher.full_name) && firstCapitalLetter.test(teacher.state)
            && firstCapitalLetter.test(teacher.city) && firstCapitalLetter.test(teacher.country) && typeof (teacher.age) === 'number' &&
            /* (/^\+(\([0-9]{3}\))|([0-9]{3})[\-\s\.]?[0-9]{3}[\-\s\.]?[0-9]{4,6}$/.test(teacher.phone))&&*/  teacher.email.includes('@'))
            return true;
    return false;
}

function filterUsers(users, country, age, gender, favorite) {
    let filteredUsers = users;
    if (country) {
        filteredUsers = filteredUsers.filter(function (item) {
            return country === item.country;
        });
    }
    if (age) {
        filteredUsers = filteredUsers.filter(function (item) {
            return age === item.age;
        });
    }
    if (gender) {
        filteredUsers = filteredUsers.filter(function (item) {
            return gender === item.gender;
        });
    }
    if (favorite) {
        filteredUsers = filteredUsers.filter(function (item) {
            return favorite === item.favorite;
        });
    }
    return filteredUsers;

}

function sortUsers(users, field, ascendingOrder) {
    users = users.sort((a, b) => ascendingOrder ? compareObjects(a, b, field) : compareObjects(b, a, field));
    return users;

}

function compareObjects(el1, el2, field) {
    return compare(el1[field], el2[field]);
}

function compare(el1, el2) {
    if (el1 === el2)
        return 0;
    if (el1 > el2)
        return 1;
    else return -1;
}


function task6(array, func) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (func(array[i]))
            count++;
    }
    return Math.round(count / array.length * 100);
}

function task5(array, search) {
    var element = array.find(ar => (ar.full_name == search || ar.note == search || ar.age == search));
    return element;
}

function addTeachers(processedArray) {
    let teachersToAdd = [];
    let favoutiteTeachersToAdd = [];
    for (let teacher of processedArray) {
        let article = document.createElement("article");
        article.setAttribute("id", "list-user-" + teachersToAdd.length);
        getTeacherArticle(article, teacher, teachersToAdd.length);

        if (teacher.favorite) {
            let article = document.createElement("article");
            article.setAttribute("id", "fav-user-" + teachersToAdd.length);
            getTeacherArticle(article, teacher, teachersToAdd.length);
            favoutiteTeachersToAdd.push(article);
        }
        teachersToAdd.push(article);
    }
    let teachersList = document.getElementById("teachers-list");
    let carousel = document.getElementById("carousel");
    for (let article of teachersToAdd) {
        teachersList.appendChild(article);
    }
    for (let article of favoutiteTeachersToAdd) {
        carousel.appendChild(article);
    }
}

function getTeacherArticle(article, teacher, id) {
    article.setAttribute("class", "teacher-entity");
    let teacherPfp = document.createElement("div");
    teacherPfp.setAttribute("class", "teacher-pfp");
    let starDiv = document.createElement("div");
    starDiv.setAttribute("class", teacher.favorite ? "star" : "star not-display");
    let star = document.createElement("img");
    star.setAttribute("src", "images/star.png");
    star.setAttribute("alt", "Favorite");
    starDiv.appendChild(star);
    article.appendChild(starDiv);
    let image;
    if (teacher.picture_thumbnail) {
        image = document.createElement("img");
        image.setAttribute("src", teacher.picture_large);
        image.setAttribute("alt", teacher.full_name + "'s profile picture");
    } else {
        image = document.createElement("p");
        image.setAttribute("class", "pfp");
        let names = teacher.full_name.split(" ");
        image.innerText = names[0].charAt(0).toUpperCase() + ".";
        if (names.length > 1)
            image.innerText += names[names.length - 1].charAt(0).toUpperCase();
    }
    teacherPfp.appendChild(image);
    let name = document.createElement("p");
    name.setAttribute("class", 'name');
    name.innerText = teacher.full_name;
    let speciality = document.createElement("p");
    speciality.setAttribute("class", 'speciality');
    speciality.innerText = teacher.course;
    let country = document.createElement("p");
    country.setAttribute("class", 'country');
    country.innerText = teacher.country;

    article.appendChild(teacherPfp);
    article.appendChild(name);
    article.appendChild(speciality);
    article.appendChild(country);

    article.addEventListener('click', (event) => {
        addTeacherPopup(teacher, id);
    })
}


function getTeacherArticle1(article, teacher, id) {
    article.setAttribute("class", "teacher-entity");
    if (teacher.picture_thumbnail) {
        article.innerHTML += "<div class='star " + (!teacher.favorite ? " not-display" : "") + "'>" +
            "               <img src='images/star.png' alt='Favorite'></div>" +
            "        <div class=\"teacher-pfp\">\n" +


            "<img src=\'" + teacher.picture_large + "' alt=\"" + teacher.full_name + "'s profile picture\">"

            + "     </div>   <p class=\"name\">" + teacher.full_name + "</p>\n" +
            "        <p class=\"speciality\">" + teacher.course + "</p>\n" +
            "        <p class=\"country\">" + teacher.country + "</p>\n"
    } else {
        let names = teacher.full_name.split(" ");
        article.innerHTML += "<div class='star " + (!teacher.favorite ? " not-display" : "") + "'>" +
            "               <img src='images/star.png' alt='Favorite'></div>" +
            "        <div class=\"teacher-pfp\">\n" +
            "<p class='pfp'>" + names[0].charAt(0).toUpperCase() + "." + (names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : "") + "</p>"
            + " </div>       <p class=\"name\">" + teacher.full_name + "</p>\n" +
            "        <p class=\"speciality\">" + teacher.course + "</p>\n" +
            "        <p class=\"country\">" + teacher.country + "</p>\n";
    }


    article.addEventListener('click', (event) => {
        addTeacherPopup(teacher, id);
    })
}


function addAddingTeacherPopup() {
    let popupShown = true;
    document.getElementById("overlay").setAttribute("style", "");
    document.getElementById("add-teacher").setAttribute("style", "");

    document.getElementById("add-teacher-close-button").addEventListener("click", () => {
        if (popupShown) {
            popupShown = false;
            document.getElementById("overlay").setAttribute("style", "display: none");
            document.getElementById("add-teacher").setAttribute("style", "display: none");
            return;
        }
    });
}

function addTeacherOnClickingButton() {
    document.getElementById("add-button").addEventListener("click", (event) => {
        event.preventDefault();

        function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - birthday;
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        let age = calculateAge(Date.parse(document.getElementById("birthdate").value));

        let user = {
            "id": id,
            "favorite": false,
            "bg_color": document.getElementById("bg-colour").value,
            "course": document.getElementById("speciality").options[document.getElementById("speciality").selectedIndex].innerText,
            "note": document.getElementById("comments").value,
            "title": undefined,
            "gender": document.getElementById("male").checked ? "male" : "female",
            "full_name": document.getElementById("name").value,
            "city": document.getElementById("city").value,
            "state": document.getElementById("city").value,
            "country": document.getElementById("country").value,
            "postcode": undefined,
            "coordinates": {
                "latitude": undefined,
                "longitude": undefined
            },
            "timezone": {
                "offset": undefined,
                "description": undefined
            },
            "email": document.getElementById("email").value,
            "b_date": document.getElementById("birthdate").value,
            "age": age,
            "phone": document.getElementById("phone").value,
            "picture_large": undefined,
            "picture_thumbnail": undefined
        };

        if (isValid(user)) {
            processedArray.push(user);
            id++;
            let countries = [];
            let country = document.getElementById("search-region");
            for (let i = 0; i < country.options.length; ++i) {
                countries.push(country.options[i].innerText)
            }
            if (!countries.includes(user.country)) {
                countries.push(user.country);
                updateCountryFilters(countries);
            }
            applyFilters();

            document.getElementById("add-teacher-close-button").click();
            addTeacherPopup(user, processedArray.length - 1);
        } else alert("Invalid user data. Check if the input is correct and try again.")

    });

}


function addTeacherPopup(teacher, num) {
    let popupShown = true;
    document.getElementById("overlay").setAttribute("style", "");
    document.getElementById("teacher-info").setAttribute("style", "");
    //     <div data-background-color="#1989ff" id="teacher-info">
    document.getElementById("teacher-info").setAttribute("data-background-color", teacher.bg_color);

    document.getElementById("teacher-info-close-button").addEventListener("click", () => {
        if (popupShown) {
            popupShown = false;
            document.getElementById("overlay").setAttribute("style", "display: none");
            document.getElementById("teacher-info").setAttribute("style", "display: none");
            return;
        }
    })
    //         <div className="popup-header">
    //             <h3>Teacher info</h3>
    //             <img alt="Close" className="icon" src="images/cross.png">
    //         </div>
    //         <img alt="Taylor Swift"
    let favouriteButton = document.getElementById("teacher-info-favourite");
    favouriteButton.innerText = teacher.favorite ? "Favorite" : "Not favorite";
    favouriteButton.setAttribute("class", "favourite-" + teacher.favorite);

    favouriteButton.addEventListener("click", () => {
        if (popupShown) {
            teacher.favorite = !teacher.favorite;
            favouriteButton.setAttribute("class", "favourite-" + teacher.favorite);
            favouriteButton.innerText = teacher.favorite ? "Unfavorite" : "Add to favorites";
            let listUser = document.getElementById("list-user-" + num);
            if (listUser) {
                listUser.firstChild.setAttribute("class", teacher.favorite ? "star" : "star not-display");
            }
            let searchUser = document.getElementById("search-user-" + num);
            if (searchUser) {
                searchUser.firstChild.setAttribute("class", teacher.favorite ? "star" : "star not-display");
            }
            if (!teacher.favorite)
                document.getElementById("fav-user-" + num).remove();
            else {
                let article = document.createElement("article");
                article.setAttribute("id", "fav-user-" + num);
                getTeacherArticle(article, teacher, num);
                document.getElementById("carousel").appendChild(article);
            }
            if (document.getElementById("only-favs").checked)
                applyFilters();
        }
    });
    favouriteButton.addEventListener("mouseover", () => {
        if (popupShown)
            favouriteButton.innerText = teacher.favorite ? "Unfavorite" : "Add to favorites";
    });

    favouriteButton.addEventListener("mouseout", () => {
        if (popupShown)
            favouriteButton.innerText = teacher.favorite ? "Favorite" : "Not favorite";
    });

    let photo = document.getElementById("teacher-info-picture")
    if (teacher.picture_large) {
        //              src="https://m.media-amazon.com/images/M/MV5BMjA5ODI0NzIzNV5BMl5BanBnXkFtZTcwMzM0NjI2Nw@@._V1_.jpg">
        photo.setAttribute("src", teacher.picture_large);
        photo.setAttribute("alt", teacher.full_name);

    } else {
        photo.setAttribute("src", "https://th.bing.com/th/id/OIP._VoTfUzENldEmDbFEcQi4QHaHa?pid=ImgDet&rs=1");
        photo.setAttribute("alt", "Standard PFP");

    }
    //             <p className="name">Taylor Swift (she/her)</p>

    document.getElementById("teacher-info-name").innerText = teacher.full_name;
    document.getElementById("teacher-info-speciality").innerText = teacher.course;
    document.getElementById("teacher-info-place").innerText = teacher.city + ", " + teacher.country;
    document.getElementById("teacher-info-age-gender").innerText = teacher.age + ", " + teacher.gender;
    document.getElementById("teacher-info-email").setAttribute("href", "mailto:" + teacher.email);
    document.getElementById("teacher-info-email").innerText = teacher.email;
    document.getElementById("teacher-info-phone").innerText = teacher.phone;
    document.getElementById("teacher-info-comments").innerText = teacher.note;

    let toggleMapButton = document.createElement("a");


}

function updateCountryFilters(countriesChoices) {
    let country = document.createElement("select");
    country.setAttribute("id", "search-region");
    country.setAttribute("name", "region");

    let option = document.createElement("option");
    option.setAttribute("value", "");
    option.innerText = "All";
    country.appendChild(option);

    countriesChoices.sort((el1, el2) => compare(el1, el2));

    let filterNodes = getFilterNodes(countriesChoices);
    for (let option of filterNodes)
        country.appendChild(option);

    document.getElementById("search-region").replaceWith(country);
}

function getFilterNodes(countriesChoices) {
    let filterNodes = [];
    for (let t of countriesChoices) {
        let option = document.createElement("option");
        option.setAttribute("value", t.replaceAll(" ", "-"))
        option.innerText = t;
        filterNodes.push(option);
    }
    return filterNodes;
}

function addFilterOptions() {
    let countriesChoices = [];
    for (let t of processedArray) {
        if (t.country && !countriesChoices.find((el) => el === t.country))
            countriesChoices.push(t.country);
    }
    updateCountryFilters(countriesChoices);

    document.getElementById("teachers-search-filters").addEventListener("change", () => {
        applyFilters();
    });
    document.getElementById("only-with-photo").addEventListener("click", () => {
        applyFilters();
    });
    document.getElementById("only-favs").addEventListener("click", () => {
        applyFilters();
    });
}

function applyFilters() {
    let showedOnPage = [];
    filteredArray = [];
    let age = document.getElementById("search-age");
    age = age.options[age.selectedIndex].innerText;
    let country = document.getElementById("search-region");
    country = country.options[country.selectedIndex].innerText;
    let sex = document.getElementById("search-sex").value;
    let onlyWithPhoto = document.getElementById("only-with-photo").checked;
    let onlyFavourites = document.getElementById("only-favs").checked;


    let ageMoreThan = 0;
    let ageLessThan = 1000;
    if (age !== "All") {
        ageMoreThan = age.substring(0, 2);
        if (age.length > 3)
            ageLessThan = age.length > 3 ? age.substring(3) : 1000;
    }
    let i = 0;
    for (let t of processedArray) {
        if (t.age >= ageMoreThan && t.age <= ageLessThan && (country === 'All' || t.country === country) &&
            ((sex === "" || sex === t.gender) || (sex === "other" && !('male' === t.gender || 'female' === t.gender))) && (onlyWithPhoto === false || t.picture_large) && (onlyFavourites === false || t.favorite)) {
            let article = document.createElement("article");
            article.setAttribute("id", "list-user-" + i);
            getTeacherArticle(article, t, i);
            showedOnPage.push(article);
            filteredArray.push(t);
        }
        ++i;
    }
    let list = document.createElement("section");
    list.setAttribute("id", "teachers-list");
    for (let t of showedOnPage)
        list.appendChild(t);

    if (showedOnPage.length === 0)
        list.innerHTML += "<p>No such elements found</p>"

    document.getElementById("teachers-list").replaceWith(list);
    createStatisticsTable(createStatisticsTableContent());

}

function searchResults(event) {
    event.preventDefault();
    let search = document.getElementById("search-field").value;
    let resultNode = document.getElementById("search-results-node");
    if (search === "") {
        resultNode.remove();
    } else {
        if (resultNode)
            resultNode.remove();
        resultNode = document.createElement('article');
        resultNode.setAttribute('id', 'search-results-node');

        let results = document.createElement('div');
        results.setAttribute('id', 'search-results');

        resultNode.innerHTML += "<h3>Results of search: " + search + "</h3>";
        let teachersList = [];
        for (let i = 0; i < processedArray.length; ++i) {
            if (processedArray[i].full_name.toLowerCase().includes(search.toLowerCase()) ||
                (processedArray[i].note && processedArray[i].note.toLowerCase().includes(search.toLowerCase()))
                || processedArray[i].age == search) {
                let article = document.createElement("article");
                article.setAttribute("id", "search-user-" + i);
                getTeacherArticle(article, processedArray[i], i);

                if (processedArray[i].full_name.toLowerCase().includes(search.toLowerCase())) {
                    teachersList.unshift(article);
                    continue;
                }
                teachersList.push(article);
            }
        }

        if (teachersList.length == 0) {
            results.innerHTML += "<p>No such elements found</p>"
        } else {
            for (let t of teachersList)
                results.appendChild(t);
        }
        resultNode.appendChild(results);
        document.getElementsByTagName("main")[0].prepend(resultNode);

    }
}

let processedArray = task1();
let filteredArray;


function createStatisticsTable(trs) {
    let table = document.createElement("table");
    table.setAttribute("id", "statistics-table");
    let header = document.createElement("tr");
    let name = document.createElement("th");
    name.innerText = "Name";
    let speciality = document.createElement("th");
    speciality.innerText = "Speciality";
    let age = document.createElement("th");
    age.innerText = "Age";
    let gender = document.createElement("th");
    gender.innerText = "Gender";
    let nationality = document.createElement("th");
    nationality.innerText = "Nationality";


    name.setAttribute("id", "statistics-table-name");
    speciality.setAttribute("id", "statistics-table-speciality");
    age.setAttribute("id", "statistics-table-age");
    gender.setAttribute("id", "statistics-table-gender");
    nationality.setAttribute("id", "statistics-table-nationality");

    name.addEventListener("click", () => {
        createStatisticsTable(createStatisticsTableContent(sortUsers(filteredArray, "full_name", ascending)));
        document.getElementById("statistics-table-name").setAttribute("class", "selected-column-" + ascending);
        ascending = !ascending;

    });

    speciality.addEventListener("click", () => {
        createStatisticsTable(createStatisticsTableContent(sortUsers(filteredArray, "course", ascending)));
        document.getElementById("statistics-table-speciality").setAttribute("class", "selected-column-" + ascending);
        ascending = !ascending;
    });

    age.addEventListener("click", () => {
        createStatisticsTable(createStatisticsTableContent(sortUsers(filteredArray, "age", ascending)));
        document.getElementById("statistics-table-age").setAttribute("class", "selected-column-" + ascending);
        ascending = !ascending;
    });

    gender.addEventListener("click", () => {
        createStatisticsTable(createStatisticsTableContent(sortUsers(filteredArray, "gender", ascending)));
        document.getElementById("statistics-table-gender").setAttribute("class", "selected-column-" + ascending);
        ascending = !ascending;
    });
    nationality.addEventListener("click", () => {
        createStatisticsTable(createStatisticsTableContent(sortUsers(filteredArray, "country", ascending)));
        document.getElementById("statistics-table-nationality").setAttribute("class", "selected-column-" + ascending);
        ascending = !ascending;
    });

    for (let a of [name, speciality, age, gender, nationality])
        header.appendChild(a);
    table.appendChild(header);
    if (trs.length > 0)
        for (let a of trs)
            table.appendChild(a);
    else {
    let tr = document.createElement('tr');
    let th = document.createElement('td');
    th.setAttribute("colspan","5");
    th.innerText="No such elements found";
    tr.appendChild(th);
    table.appendChild(tr);
    }

    document.getElementById("statistics-table").replaceWith(table);
}

let ascending = true;

function createStatisticsTableContent() {
    let trs = [];
    for (let t of filteredArray) {
        let tr = document.createElement("tr");

        let nametd = document.createElement("td");
        let coursetd = document.createElement("td");
        let agetd = document.createElement("td");
        let gendertd = document.createElement("td");
        let countrytd = document.createElement("td");

        nametd.innerText = t.full_name;
        coursetd.innerText = t.course;
        agetd.innerText = t.age;
        gendertd.innerText = capitalize(t.gender);
        countrytd.innerText = t.country;
        for (let a of [nametd, coursetd, agetd, gendertd, countrytd])
            tr.appendChild(a);
        trs.push(tr);
    }
    return trs;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function addSpecialitiesToForm() {
    let speciality = document.getElementById("speciality");
    for (let sp of courses) {
        speciality.innerHTML += " <option name=\"" + sp.replaceAll(" ", "-") + "\">" + sp + "</option>";
    }
}

window.onload = function () {
    filteredArray = [...processedArray];
    addTeachers(processedArray);
    document.getElementById("search").addEventListener("submit", (event) => (searchResults(event)));
    addFilterOptions();
    createStatisticsTable(createStatisticsTableContent());
    addSpecialitiesToForm();
    for (let t of document.getElementsByClassName("add-teacher-button"))
        t.addEventListener("click", () => {
            addAddingTeacherPopup();
        })
    addTeacherOnClickingButton();
}
