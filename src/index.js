import './styles/index.scss';
import skillsData from './json/skills.json';

function addSkills() {
  const skillsBlock = document.querySelector('.section__skills');
  for (const [title, skills] of Object.entries(skillsData)) {
    const div = document.createElement('div');
    div.innerHTML = `<b>${title}</b>: ${skills.join(', ')}`;
    skillsBlock?.append(div);
  }
}

addSkills();