import * as React from 'react'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import CompressIcon from '@mui/icons-material/Compress'
import DataObjectIcon from '@mui/icons-material/DataObject'
import FormatClearIcon from '@mui/icons-material/FormatClear'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import HandymanIcon from '@mui/icons-material/Handyman'
import CodeIcon from '@mui/icons-material/Code'
import TuneIcon from '@mui/icons-material/Tune'
import IconButton from '../../Parts/Buttons/IconButton'

export type MenuBarItem =
  | 'clear'
  | 'fix'
  | 'minify'
  | 'prettify'
  | 'metadata'
  | 'preview'
  | 'source'
  | 'errors'

export interface MenuBarProps {
  items?: MenuBarItem[]
  labels?: { [key in MenuBarItem]?: 'string' | undefined }
  colors?: { [key in MenuBarItem]?: 'success' | 'warning' | 'error' | undefined }
  onClear?: () => void
  onFix?: () => void
  onMinify?: () => void
  onPrettify?: () => void
  onMetadata?: () => void
  onPreview?: () => void
  onSource?: () => void
  onErrors?: () => void
}

// TODO: add spacing between buttons
// TODO: use React.useMemo for better performance/animation
export default function MenuBar(props: React.PropsWithChildren<MenuBarProps>) {
  const Fix = () => {
    if (!props.items?.includes('fix')) return null
    return (
      <IconButton
        small
        variant="text"
        label={props.labels?.fix || 'Fix'}
        Icon={HandymanIcon}
        color={props.colors?.fix || 'info'}
        disabled={!props.onFix}
        onClick={props.onFix}
      />
    )
  }

  const Minify = () => {
    if (!props.items?.includes('minify')) return null
    return (
      <IconButton
        small
        variant="text"
        label={props.labels?.minify || 'Minify'}
        Icon={CompressIcon}
        color={props.colors?.minify || 'info'}
        disabled={!props.onMinify}
        onClick={props.onMinify}
      />
    )
  }

  const Prettify = () => {
    if (!props.items?.includes('prettify')) return null
    return (
      <IconButton
        small
        variant="text"
        label={props.labels?.prettify || 'Prettify'}
        Icon={DataObjectIcon}
        color={props.colors?.prettify || 'info'}
        disabled={!props.onPrettify}
        onClick={props.onPrettify}
      />
    )
  }

  const Metadata = () => {
    if (!props.items?.includes('metadata')) return null
    return (
      <IconButton
        small
        variant="text"
        label={props.labels?.metadata || 'Metadata'}
        Icon={TuneIcon}
        color={props.colors?.metadata || 'info'}
        disabled={!props.onMetadata}
        onClick={props.onMetadata}
      />
    )
  }

  const Preview = () => {
    if (!props.items?.includes('preview')) return null
    return (
      <IconButton
        small
        variant="text"
        label={props.labels?.preview || 'Preview'}
        Icon={CodeIcon}
        color={props.colors?.preview || 'info'}
        disabled={!props.onPreview}
        onClick={props.onPreview}
      />
    )
  }

  const Source = () => {
    if (!props.items?.includes('source')) return null
    return (
      <IconButton
        small
        variant="text"
        label={props.labels?.source || 'Source'}
        Icon={CodeIcon}
        color={props.colors?.source || 'info'}
        disabled={!props.onSource}
        onClick={props.onSource}
      />
    )
  }

  const Errors = () => {
    if (!props.items?.includes('errors')) return null
    return (
      <IconButton
        small
        variant="text"
        label={props.labels?.errors || 'Errors'}
        Icon={ReportGmailerrorredIcon}
        color={props.colors?.errors || 'info'}
        disabled={!props.onErrors}
        onClick={props.onErrors}
      />
    )
  }

  const Clear = () => {
    if (!props.items?.includes('clear')) return null
    return (
      <IconButton
        small
        variant="text"
        label={props.labels?.clear || 'Clear'}
        Icon={FormatClearIcon}
        color={props.colors?.clear || 'info'}
        disabled={!props.onClear}
        onClick={props.onClear}
      />
    )
  }

  const DefaultBar = () => {
    return (
      <Stack direction="row" spacing={1}>
        <Fix />
        <Minify />
        <Prettify />
        <Metadata />
        <Preview />
        <Source />
        <Errors />
        <Clear />
        {props.children}
      </Stack>
    )
  }

  const CustomBar = () => {
    return <React.Fragment>{props.children}</React.Fragment>
  }

  return (
    <Toolbar
      disableGutters
      sx={{ borderBottom: 'solid 1px #ddd', backgroundColor: '#fafafa', paddingX: 2 }}
    >
      {props.items ? <DefaultBar /> : <CustomBar />}
    </Toolbar>
  )
}
