import ReactMarkdown from 'react-markdown'
import { useCart } from '../../context/CartContext'
import readme from '../../../README.md?raw'
import {
  PageWrapper,
  SuccessBanner,
  SuccessTitle,
  SuccessSubtitle,
  BackButton,
  ReadmeSection,
  ReadmeHeading,
  ReadmeContent,
  ImageNotice,
  ImageNoticeTitle,
  ImageNoticeText,
} from './OrderConfirmationPage.styled'

function OrderConfirmationPage() {
  const { clearCart } = useCart()

  return (
    <PageWrapper id="main-content">
      <SuccessBanner>
        <SuccessTitle>Order confirmed</SuccessTitle>
        <SuccessSubtitle>Thank you for your purchase. Your order is being processed.</SuccessSubtitle>
        <BackButton to="/" onClick={clearCart}>
          Continue shopping
        </BackButton>
      </SuccessBanner>

      <ImageNotice>
        <ImageNoticeTitle>Note on product images</ImageNoticeTitle>
        <ImageNoticeText>
          Product images are served directly from the API and are not modified by this application.
          For best results, images should be at least <strong>800 × 800 px</strong>, use a{' '}
          <strong>transparent background</strong>, and be in <strong>PNG format</strong>.
        </ImageNoticeText>
      </ImageNotice>

      <ReadmeSection aria-label="Project documentation">
        <ReadmeHeading>About this project</ReadmeHeading>
        <ReadmeContent>
          <ReactMarkdown>{readme}</ReactMarkdown>
        </ReadmeContent>
      </ReadmeSection>
    </PageWrapper>
  )
}

export default OrderConfirmationPage
