import { FC, useState } from 'react'
import { Blurhash } from 'react-blurhash'
import { Photo } from '../interfaces'

interface SmartImageProps {
  image: Photo
}

const SmartImage: FC<SmartImageProps> = ({ image }) => {
  const [visible, setVisible] = useState(false)
  const {
    blur_hash,
    urls: { thumb },
    description,
    height,
    width
  } = image;
  return (
    <div className="m-1">
      <img
        className={visible ? 'image' : 'image d-none'}
        src={thumb}
        alt={description}
        onLoad={() => setVisible(true)}
      />
      {!visible && <Blurhash className="blur" hash={blur_hash} width={200} height={(height / width) * 200} />}
      {/* TODO extract w and h from image url */}
    </div>
  )
}

export default SmartImage
