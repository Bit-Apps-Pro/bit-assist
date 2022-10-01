import { flowAtom } from '@globalStates/atoms'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const Tawk = () => {
  const [, setFlow] = useAtom(flowAtom)

  useEffect(() => {
    setFlow((prev) => {
      if (typeof prev.config?.card_config === 'undefined') {
        prev.config.card_config = {}
      }
      prev.config.card_config.isChatWidget = true
    })
  }, [])

  return (
    <>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aut ratione dolores cum illo ipsum molestiae
        aspernatur earum nostrum, praesentium nihil quasi dicta ullam placeat laborum ducimus ea illum omnis?
      </h3>
    </>
  )
}

export default Tawk
