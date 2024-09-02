import { useCoverImage } from '../../zustand/useCoverImage'
import { Fade } from 'react-awesome-reveal'
import { default as HomePageBackground } from '../../images/undraw_bookshelves_re_lxoy.svg'

export const Home = () => {
  const coverImageUrl = useCoverImage(
    (state) => state.coverImage
  )

  return (
    <div className="absolute h-screen flex items-center justify-center w-screen">
      <div className="flex relative bottom-20 flex-col">
        {coverImageUrl ? (
          <Fade
            cascade
            key={coverImageUrl}
            onVisibilityChange={() => {}}
            duration={1000}>
            <img
              height={20}
              src={coverImageUrl || ''}
              alt="Cover Image"
            />
          </Fade>
        ) : (
          <img
            src={HomePageBackground}
            className="p-10 mt-36"
            alt="Home Page Background"
          />
        )}
      </div>
    </div>
  )
}
