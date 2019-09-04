import { BaseInput } from './base-input';

const template = document.createElement('template');

template.innerHTML = `<style>
    button {
        font-size: 16pt;
        border: 2px solid #08e375;
        background-color: white;
    }
    
    button:disabled {
        border-color: #5d6b75;
        color: #ffffff;
        cursor: not-allowed;
    }

    button:disabled:not(.image-button) {
        background-color: #5d6b75;
    }

    button:hover:not(:disabled) {
        background-color: #08e375;
        color: white;
    }

    button.image-button {
        border-radius: 50%;
    }
    
    button:disabled ::slotted(img) {
        filter: grayscale(100%);
    }
</style>

<button>
    <slot></slot>
</button>
`;

export class Button extends BaseInput {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.element = this.shadowRoot.querySelector('button');
    this.element.setAttribute('type', 'button');

    this.element.addEventListener('click', () => this.dispatchEvent(new CustomEvent('click')));

    const slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', () => {
      const assignedNodes = slot.assignedNodes();

      if (assignedNodes[0] && assignedNodes[0].nodeName === 'IMG') {
        this.element.classList.add('image-button');
      } else {
        this.element.classList.remove('image-button');
      }
    });
  }
}

window.customElements.define('native-web-component-button', Button);