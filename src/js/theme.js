import { docReady } from './utils';
import navbarInit from './bootstrap-navbar';
import detectorInit from './detector';
import navbarDarkenOnScroll from './navbar-darken-on-scroll';
import contactFormInit from './contact-form';

// /* -------------------------------------------------------------------------- */
// /*                            Theme Initialization                            */
// /* -------------------------------------------------------------------------- */

docReady(navbarInit);
docReady(detectorInit);
docReady(navbarDarkenOnScroll);
docReady(contactFormInit);
