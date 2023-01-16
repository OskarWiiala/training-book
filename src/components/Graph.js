import { React, useContext } from 'react'
import {
  Chart,
  Title,
  Series,
  Legend,
  ValueAxis,
  ArgumentAxis,
  VisualRange,
  Font,
  CommonSeriesSettings,
  Size,
  AdaptiveLayout
} from 'devextreme-react/chart'
import PropTypes from 'prop-types'
import { ColorModeContext } from '../context/ColorModeContext'
import { getDesignTokens } from '../theme'
import useMediaQuery from '@mui/material/useMediaQuery'

const Graph = ({ data }) => {
  const { mode } = useContext(ColorModeContext)
  const mediumScreen = useMediaQuery('(min-width:550px)')

  const customizePoint = () => {
    return {
      visible: false
    }
  }

  return (
    <Chart id='chart' dataSource={data} customizePoint={customizePoint}>
      <AdaptiveLayout width={0} height={0} keepLabels={true} />
      <Size width={mediumScreen ? 500 : 250} height={mediumScreen ? 500 : 250} />
      <CommonSeriesSettings argumentField='session' type='line' />
      <Series
        id='series'
        valueField='value'
        color={getDesignTokens(mode).palette.primary.main}
      />
      <ArgumentAxis>
        <Title text='sessions'>
          <Font
            color={getDesignTokens(mode).palette.text.secondary}
            family='Montserrat'
          ></Font>
        </Title>
      </ArgumentAxis>
      <ValueAxis>
        <Title text='tonnage (kg)'>
          <Font
            color={getDesignTokens(mode).palette.text.secondary}
            family='Montserrat'
          ></Font>
        </Title>
        <VisualRange startValue={0} />
      </ValueAxis>
      <Legend visible={false} />
    </Chart>
  )
}

Graph.propTypes = {
  data: PropTypes.array.isRequired
}

export default Graph
