import React, { createContext, useContext, useEffect, useState } from 'react';
import debounce from 'lodash-es/debounce';

export interface IMediaInfo {
  desktop: boolean
  tablet: boolean
  phone: boolean
}

export const Context = createContext<IMediaInfo>({
  desktop: false,
  tablet: false,
  phone: false
})

// const DESKTOP = '1141px'
const TABLET = '1024px'
const PHONE = '768px'
const INITIAL_INFO = {
  desktop: false,
  tablet: false,
  phone: false,
}

interface IProps {
  children: any
}

function DeviceInfoProvider(props: IProps) {
  const { children } = props

  const [currentInfo, setCurrentInfo] = useState<IMediaInfo>(INITIAL_INFO)

  useEffect(() => {
    function update() {
      const isDesktop = window.matchMedia(`(min-width: ${TABLET})`).matches
      const isTablet = window.matchMedia(`(max-width: ${TABLET})`).matches
      const isPhone = window.matchMedia(`(max-width: ${PHONE})`).matches
      const newInfo: IMediaInfo = {
        desktop: !isTablet && isDesktop,
        phone: isPhone,
        tablet: !isPhone && isTablet,
      }

      if (newInfo.tablet !== currentInfo.tablet || newInfo.phone !== currentInfo.phone) {
        setCurrentInfo(newInfo)
      }
    }

    update()

    const debouncedUpdate = debounce(update, 150)
    window.addEventListener('resize', debouncedUpdate)

    return () => {
      window.removeEventListener('resize', debouncedUpdate)
    }
  }, [currentInfo])

  return <Context.Provider value={currentInfo}>{children}</Context.Provider>
}

export { DeviceInfoProvider }

export function useIsPhone(): boolean {
  return useContext(Context).phone
}

export function useIsTablet(): boolean {
  return useContext(Context).tablet
}

export function useIsMobile(): boolean {
  const media = useContext(Context)
  return media.phone || media.tablet
}
