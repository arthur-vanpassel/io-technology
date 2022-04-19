import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllVideos } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
import Image from '@/components/Image'
import { useBrandingTheme } from '@/lib/hooks/useBrandingTheme'
import SocialIcon from '@/components/social-icons'

export async function getStaticProps() {
  const { videos } = await getAllVideos()
  return { props: { videos, theme: 'blue' } }
}

export default function Videos({ videos }) {
  const { theme } = useBrandingTheme()
  const textClass = theme === 'default' ? 'text-black' : 'text-white'

  return (
    <>
      <PageSEO title={`Videos - ${siteMetadata.author}`} description={siteMetadata.description} />

      <section className={`bg-io_${theme}-500 ${textClass}`}>
        <div className="container mx-auto pt-8 pb-24 md:pb-32">
          <div className="grid grid-cols-12">
            <div className="col-start-1 col-end-12 mb-8 md:col-end-8 md:mt-4 md:mb-10 xl:row-start-1 xl:mt-12 xl:mb-16">
              <h1 className="text-4xl md:text-5xl xl:text-7xl">
                Check out our videos from{' '}
                <span className="font-serif">meetups and expert talks</span>
              </h1>
            </div>
            <div className="col-start-1 col-end-12 mb-8 md:col-start-9 md:col-end-13 md:row-start-1 md:row-end-4 md:mb-0 xl:col-start-9 xl:row-start-1">
              <Image
                src={'/meetup.jpg'}
                width={1192}
                height={1192}
                layout="responsive"
                className="rounded-full"
              />
            </div>
            <div className="col-span-full md:col-span-5 md:col-start-4 xl:col-span-4 xl:col-start-4">
              <div className="xl:w-11/12">
                <p className="mb-4">
                  Most of our meetups are live streamed to YouTube. Please subscribe to get notified
                  when a meetup is planned!
                </p>
                <div className="flex flex-row">
                  <SocialIcon
                    kind="youtube"
                    href={siteMetadata.youtube}
                    size="6"
                    classNames="!text-white mr-2"
                  />{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={siteMetadata.youtube}
                    className="underline underline-offset-1"
                  >
                    iO - Technology
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {videos.map((vid) => (
              <div key={vid.id} className="md p-4 md:w-1/3">
                <VideoCard video={vid} playButton={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
