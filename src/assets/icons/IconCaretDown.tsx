type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
};

const IconCaretDown = ({size, color = "currentColor", ...props}: IconProps)=>{
    return(
        <svg
            width={size}
            height={size}
            viewBox="0 0 28 28"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                d="M24.0249 8H3.97511C2.219 8 1.33953 10.1282 2.58129 11.3729L12.6062 21.4213C13.376 22.1929 14.624 22.1929 15.3938 21.4213L25.4187 11.3729C26.6605 10.1282 25.781 8 24.0249 8Z"
                fill={color}
            />
        </svg>
    )
}

export default IconCaretDown;