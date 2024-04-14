import Joyride from 'react-joyride'

interface Props {
  enabled: boolean
}

function DashboardJoyride({ enabled }: Props) {
  if (!enabled) return null

  const steps = [
    {
      target: '.dashboard-joyride-term',
      content: 'Here is the term you just added...',
      disableBeacon: true,
    },
    {
      target: '.dashboard-joyride-gtrends-button',
      content: 'You can click this button to view its search data...',
      disableBeacon: true,
    },
    {
      target: '.dashboard-joyride-add-term-button',
      content:
        'And click here to add a new term! Then come back to hedgehacks to monitor your terms. Welcome to hedgehacks!',
      disableBeacon: true,
    },
  ]

  return (
    <Joyride
      showProgress={true}
      showSkipButton={true}
      continuous={true}
      scrollToFirstStep={true}
      steps={steps}
      styles={{
        options: {
          primaryColor: '#77b300',
        },
      }}
    />
  )
}
export default DashboardJoyride
