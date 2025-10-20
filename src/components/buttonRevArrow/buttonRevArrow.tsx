'use client'

type ButtonProps = {
  param: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
}

const ButtonRevArrow: React.FC<ButtonProps> = ({ param, size = 'small' }) => {
  const textSizeConfig = {
    small: { fontSize: '1rem', height: '61px' },
    medium: { fontSize: '1.25rem', height: '27px' },
    large: { fontSize: '1.5rem', height: '31px' },
    xlarge: { fontSize: '2rem', height: '37px' },
  }

  const arrowSizeConfig = {
    small: { width: '13px', height: '13px' },
    medium: { width: '16px', height: '16px' },
    large: { width: '19px', height: '19px' },
    xlarge: { width: '24px', height: '24px' },
  }

  return (
    <button
      className="arrow-rev-button"
      style={{
        fontSize: textSizeConfig[size].fontSize,
        height: textSizeConfig[size].height,
      }}
    >
      {[...Array(2)].map((_, index) => (
        <div key={index}>
          <p>{param}</p>
          <svg
            style={{
              height: arrowSizeConfig[size].height,
              width: arrowSizeConfig[size].width,
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 9.61 9.06"
          >
            <g>
              <path
                d="M.5,9.41l.61.57L9.25,2.31V9.39h.86V.92h-9v.82H8.64Z"
                transform="translate(-0.5 -0.92)"
              />
            </g>
          </svg>
        </div>
      ))}
    </button>
  )
}

export default ButtonRevArrow
