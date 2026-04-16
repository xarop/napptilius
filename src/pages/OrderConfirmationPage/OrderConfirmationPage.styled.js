import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PageWrapper = styled.main`
  max-width: var(--max-width-page);
  margin: 0 auto;
  padding: var(--spacing-2xl) var(--spacing-md);

  @media (min-width: 768px) {
    padding: var(--spacing-2xl) var(--spacing-xl);
  }
`

export const SuccessBanner = styled.div`
  border: 0.5px solid var(--color-black);
  padding: var(--spacing-2xl) var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  text-align: center;
`

export const SuccessTitle = styled.h1`
  font-size: var(--fs-xl);
  font-weight: var(--fw-light);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  margin-bottom: var(--spacing-md);
`

export const SuccessSubtitle = styled.p`
  font-size: var(--fs-body);
  color: var(--color-grey-500);
  letter-spacing: var(--ls-md);
  margin-bottom: var(--spacing-xl);
`

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md) var(--spacing-2xl);
  background: var(--color-black);
  color: var(--color-white);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  text-decoration: none;
  transition: opacity var(--transition-fast);

  &:hover {
    opacity: 0.8;
  }
`

export const ReadmeSection = styled.section`
  border-top: 0.5px solid var(--color-black);
  padding-top: var(--spacing-2xl);
`

export const ReadmeHeading = styled.h2`
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  margin-bottom: var(--spacing-xl);
  color: var(--color-grey-500);
`

export const ReadmeContent = styled.div`
  font-size: var(--fs-md);
  line-height: var(--lh-normal);
  color: var(--color-black);

  h1, h2, h3 {
    font-weight: var(--fw-bold);
    letter-spacing: var(--ls-wider);
    text-transform: uppercase;
    margin: var(--spacing-xl) 0 var(--spacing-md);
    font-size: var(--fs-md);
  }

  h1 {
    font-size: var(--fs-lg);
  }

  p {
    margin-bottom: var(--spacing-md);
    color: var(--color-grey-700);
  }

  a {
    color: var(--color-black);
    text-decoration: underline;
    text-underline-offset: 3px;
    &:hover { opacity: 0.6; }
  }

  ul, ol {
    margin: 0 0 var(--spacing-md) var(--spacing-xl);
    color: var(--color-grey-700);
  }

  li {
    margin-bottom: var(--spacing-xs);
  }

  code {
    font-family: 'Courier New', monospace;
    font-size: var(--fs-body);
    background: var(--color-grey-100);
    padding: 2px 6px;
  }

  pre {
    background: var(--color-grey-100);
    padding: var(--spacing-md);
    overflow-x: auto;
    margin-bottom: var(--spacing-md);

    code {
      background: none;
      padding: 0;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: var(--spacing-xl);
    font-size: var(--fs-body);
  }

  th, td {
    text-align: left;
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 0.5px solid var(--color-grey-200);
  }

  th {
    font-size: var(--fs-xs);
    font-weight: var(--fw-bold);
    letter-spacing: var(--ls-wider);
    text-transform: uppercase;
    color: var(--color-grey-500);
  }

  blockquote {
    border-left: 2px solid var(--color-black);
    padding-left: var(--spacing-md);
    color: var(--color-grey-500);
    margin: 0 0 var(--spacing-md);
  }

  hr {
    border: none;
    border-top: 0.5px solid var(--color-grey-200);
    margin: var(--spacing-xl) 0;
  }
`

export const ImageNotice = styled.aside`
  border: 0.5px solid var(--color-grey-300);
  padding: var(--spacing-md) var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  background: var(--color-grey-100);
`

export const ImageNoticeTitle = styled.p`
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  letter-spacing: var(--ls-wider);
  text-transform: uppercase;
  margin-bottom: var(--spacing-sm);
`

export const ImageNoticeText = styled.p`
  font-size: var(--fs-body);
  color: var(--color-grey-700);
  line-height: var(--lh-normal);
`
