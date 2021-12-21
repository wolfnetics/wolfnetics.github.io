import utils from './utils';

/* -------------------------------------------------------------------------- */
/*                         Navbar Darken on scroll                        */
/* -------------------------------------------------------------------------- */
const navbarDarkenOnScroll = () => {
  const Selector = {
    NAVBAR: '[data-navbar-darken-on-scroll]',
    NAVBAR_COLLAPSE: '.navbar-collapse',
    NAVBAR_TOGGLER: '.navbar-toggler',
  };

  const Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse',
  };
  const DataKey = {
    NAVBAR_DARKEN_ON_SCROLL: 'navbar-darken-on-scroll',
  };
  const navbar = document.querySelector(Selector.NAVBAR);
  if (navbar) {
    const defaultColorName = 'dark';
    const windowHeight = window.innerHeight;
    const html = document.documentElement;
    // const navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);
    const allColors = { ...utils.colors, ...utils.grays };
    const name = utils.getData(navbar, DataKey.NAVBAR_DARKEN_ON_SCROLL);
    const colorName = Object.keys(allColors).includes(name.toString())
      ? name
      : defaultColorName;
    const color = allColors[colorName];
    // const bgClassName = `bg-${colorName}`;
    const colorRgb = utils.hexToRgb(color);
    const { backgroundImage } = window.getComputedStyle(navbar);
    // const transition = "background-color 0.35s ease";
    const borderColor = utils.hexToRgb(allColors['700']);
    const paddingTop = 16;
    navbar.style.paddingTop = `${paddingTop}px`;
    navbar.style.backgroundImage = 'none';
    navbar.style.borderBottom = 'none';
    //shadow
    const shadowName = 'shadow-transition';
    // Change navbar background color on scroll'
    window.addEventListener(Events.SCROLL, () => {
      const { scrollTop } = html;
      let alpha = (scrollTop / windowHeight) * 2;
      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = `rgba(${colorRgb[0]}, ${colorRgb[1]}, ${colorRgb[2]}, ${alpha})`;
      navbar.style.borderBottom = `1px solid rgba(${borderColor[0]}, ${borderColor[1]}, ${borderColor[2]}, ${alpha})`;
      navbar.style.paddingTop = `${paddingTop * (1 - alpha)}px`;
      navbar.style.backgroundImage = alpha > 0
        ? backgroundImage
        : 'none';
      alpha > 0.2 ? navbar.classList.add(shadowName) : navbar.classList.remove(shadowName);
    });
  }
};
export default navbarDarkenOnScroll;
