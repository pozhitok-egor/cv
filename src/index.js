import './styles/index.scss';

async function loadContent() {
  const data = await fetch("assets/json/content.json")
    .then(res => res.json())
    .catch(err => console.error(err));
  addSkills(data.skills);
  addAdditionalEducation(data.additionalEducation);
  addLanguages(data.languages);
  addPublications(data.publications);
  addSummary(data.summary);
  addEducation(data.education);
  addExperience(data.experience);
}

function addSummary(textArray) {
  const summary = document.getElementById('summary');
  textArray.forEach(text => {
    const paragraph = document.createElement('p');
    paragraph.className = "section__text";
    paragraph.textContent = text;
    summary?.appendChild(paragraph);
  })
}

function addEducation(educationArray) {
  const educationList = document.getElementById('education');
  educationArray.forEach(education => {
    const block = createElement('div');

    const dateTime = createElement('div', 'section__time');
    const date = createElement('div', null, education.date);
    dateTime.appendChild(date);

    if (education.location) {
      const location = createElement('div', null, education.location);
      dateTime.classList.add('spaced');
      dateTime.appendChild(location);
    }

    const degree = createElement('h3', 'section__title', education.degree);

    const place = createElement('h4', 'section__place', education.place);

    block.append(dateTime, degree, place);
    educationList?.appendChild(block);
  })
}

function createElement(element, className, textContent) {
  const el = document.createElement(element);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

function addExperience(places) {
  const experience = document.getElementById('experience');
  places.forEach(place => {
    const infoBlock = createElement('div');
    const time = createElement('div', 'section__time', place.date);
    const title = createElement('h3', 'section__title', place.jobTitle);
    const company = createElement('h3', 'section__place', place.company);
    const list = createElement('ul', 'section__participation-list');
    place.progress.forEach(progressItem => {
      const item = createElement('li', 'section__participation-item');
      item.textContent = progressItem;
      list.appendChild(item);
    })
    infoBlock.append(time, title, company, list);
    experience?.appendChild(infoBlock);
  })
}

function addSkills(skills) {
  const skillsBlock = document.getElementById('skills');
  for (const [title, skillsList] of Object.entries(skills)) {
    const div = document.createElement('div');
    div.innerHTML = `<b>${title}</b>: ${skillsList.join(', ')}`;
    skillsBlock?.append(div);
  }
}

function createLink(href, className, textContent) {
  const link = createElement('a', className);
  link.href = href;
  link.target = '_blank';
  link.textContent = textContent;
  return link;
}

function addAdditionalEducation(items) {
  const list = document.getElementById('additional-education');
  items.forEach((item, index) => {
    const listItem = createElement('li', 'section__list-item');

    if (item.certificateUrl) {
      const link = createLink(item.certificateUrl, "section__link link", item.title);
      listItem.appendChild(link);
    } else {
      listItem.textContent = item.title;
    }

    if (item.time) {
      const time = createElement('div', "section__time gray", item.time);
      listItem.appendChild(time);
    }
    list?.appendChild(listItem);
  });
}

function addLanguages(languages) {
  const list = document.getElementById('languages');
  languages.forEach((language, index) => {
    const listItem = createElement('li', 'section__list-item spaced');
    const name = createElement('div', 'language__name', language.language);
    const separator = createElement('div', 'language__separator', '|');
    const level = createElement('div', 'language__level', language.level);

    listItem.append(name, separator, level);
    list?.append(listItem);
  });
}

function addPublications(publications) {
  const list = document.getElementById('publications');
  publications.forEach(publication => {
    const listItem = createElement('li', 'section__list-item');

    const link = createLink(publication.url, "section__link link", publication.name);
    listItem.appendChild(link);
    list?.appendChild(listItem);
  })
}

function addLinkById(id, link) {
  const element = document.getElementById(id);
  element?.setAttribute('href', link);
}

function addLinks(links) {
  addLinkById('telegram', links.telegram);
  addLinkById('linkedin', links.linkedin);
  addLinkById('facebook', links.facebook);
  addLinkById('github', links.github);
  addLinkById('pdf', links.pdf);
}

window.onload = () => {
  loadContent();
};
