interface IPageTitleProps {
  title: string;
  marginLeft?: boolean;
}

/**
 * Renders page title for each page.
 * @function PageTitle
 * @param {boolean} marginLeft - Adds extra margin left if true
 * @param {string} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */
const PageTitle = ({ title, marginLeft }: IPageTitleProps) => (
  <section>
  </section>
);

export default PageTitle;
