import * as React from 'react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Resource from '../Resource'
import Detector from '../Detector'
import Features from '../Features'
import Schema from '../Schema'

export interface DescribeProps {
  state: any
  dispatch: any
}

export default function Describe(props: DescribeProps) {
  const [value, setValue] = React.useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Resource" {...a11yProps(0)} />
          <Tab label="Schema" {...a11yProps(1)} />
          <Tab label="Features" {...a11yProps(2)} />
          <Tab label="Detector" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Resource
          resource={props.state.resource}
          onSave={(resource) =>
            props.dispatch({ type: 'UPDATE_RESOURCE', update: resource })
          }
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Schema
          schema={props.state.resource.schema}
          onSave={(schema) =>
            props.dispatch({ type: 'UPDATE_RESOURCE', update: { schema } })
          }
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Features
          features={{
            layout: props.state.resource.layout,
            dialect: props.state.resource.dialect,
            control: props.state.resource.control,
          }}
          onSave={(features) =>
            props.dispatch({ type: 'UPDATE_RESOURCE', update: features })
          }
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Detector
          detector={props.state.detector}
          onSave={(detector) => props.dispatch({ type: 'UPDATE_DETECTOR', detector })}
        />
      </TabPanel>
    </Box>
  )
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
