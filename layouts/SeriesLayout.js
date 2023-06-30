import { useState } from 'react'
import removeMarkdown from 'markdown-to-text'
import Pagination from '@/components/Pagination'
import Serie from '@/components/Serie'
import { useBrandingTheme } from '@/lib/hooks/useBrandingTheme'

export default function ListLayout({
  series,
  title,
  initialDisplaySeries = [],
  pagination,
  authors,
  theme,
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredSeries = series.filter((frontMatter) => {
    const searchContent =
      removeMarkdown(frontMatter.title) + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplaySeries exist, display it if no searchValue is specified
  const displaySeries =
    initialDisplaySeries.length > 0 && !searchValue ? initialDisplaySeries : filteredSeries

  const { fontColor } = useBrandingTheme()
  const textClass = `text-${fontColor}`

  return (
    <>
      <section className={`bg-io_${theme}-500 ${textClass}`}>
        <div className="container mx-auto mb-12 pt-0 pb-24">
          <div className="grid grid-cols-12">
            <div className="col-start-1 col-end-12 mb-8 md:col-end-8 md:mt-4 md:mb-10 xl:row-start-1 xl:mt-12 xl:mb-16">
              <h1 className="text-4xl md:text-5xl xl:text-7xl">
                <span className="block">{title}</span>
              </h1>
            </div>
            <div className="col-span-full grid grid-cols-12 md:col-span-6 md:col-start-1 lg:col-span-6 lg:col-start-1">
              <div className="col-span-full">
                <div className="relative">
                  <div className="relative flex justify-between py-4">
                    <input
                      type="search"
                      name="search"
                      placeholder="Search series"
                      className="w-full px-5 py-5 text-black"
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <svg
                      className="absolute right-3 top-9 h-7 w-7 text-gray-400 dark:text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto">
        <ul>
          {!filteredSeries.length && 'No series found.'}
          {displaySeries.map((frontMatter, index) => {
            const { slug, date, title, tags } = frontMatter
            const authorsResolved = frontMatter.authors.map((author) => {
              return authors[author]
            })

            return (
              <li key={slug}>
                <Serie
                  key={slug}
                  slug={slug}
                  date={date}
                  title={title}
                  tags={tags}
                  authors={authorsResolved}
                  border={index !== 0}
                  subpath="series"
                />
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <div className="container mx-auto">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            subpath="series"
          />
        </div>
      )}
    </>
  )
}
