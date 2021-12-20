import { removeClass } from './utils';

const USER = 'aW5mbw==';
const HOST = 'd29sZm5ldGljcw==';
const TLD = 'Y29t';

const sendMail = (contactForm, subject, message) => {
  const email = `${atob(USER)}\u0040${atob(HOST)}\u002e${atob(TLD)}`;
  const anchor = document.createElement('a');
  anchor.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  contactForm.after(anchor);
  anchor.click();
  anchor.remove();
};

const contactFormInit = () => {
  const Selector = {
    CONTACT_FORM: '.contact-form',
    SUCCESS_MESSAGE: '.success-message',
  };

  const contactForm = document.querySelector(Selector.CONTACT_FORM);
  const successMessage = document.querySelector(Selector.SUCCESS_MESSAGE);

  if (contactForm) {
    contactForm.onsubmit = () => {
      const subject = contactForm.querySelector('[name="subject"]').value;
      const message = contactForm.querySelector('[name="message"]').value;
      sendMail(contactForm, subject, message);
      contactForm.remove();
      removeClass(successMessage, 'd-none');
    };
  }
};

export default contactFormInit;
