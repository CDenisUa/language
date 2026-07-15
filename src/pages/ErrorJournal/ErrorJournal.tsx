// Core
import { useMemo, useState } from 'react'
// Components
import ErrorEntryForm from '@/pages/ErrorJournal/ErrorEntryForm'
import ErrorEntryList from '@/pages/ErrorJournal/ErrorEntryList'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useErrorJournalEntries } from '@/hooks/useErrorJournalEntries'
import { useWords } from '@/hooks/useWords'
import { useShadowingTracks } from '@/hooks/useShadowingTracks'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { errorJournalRepository } from '@/services/db/errorJournalRepository'
// Types
import type { ErrorEntryFormValues, LinkOption } from '@/pages/ErrorJournal/ErrorEntryForm'
import type { ErrorJournalEntryRecord, ErrorJournalLinkType } from '@/types/errorJournalEntry'
// Styles
import './ErrorJournal.css'

function parseLinkValue(value: string): { type: ErrorJournalLinkType; id: string } | null {
  if (!value) return null
  const [type, id] = value.split(':') as [ErrorJournalLinkType, string]
  return { type, id }
}

function ErrorJournal() {
  const { t } = useTranslation()
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  const { entries, reload } = useErrorJournalEntries(activeLanguage)
  const { words } = useWords(activeLanguage)
  const { tracks } = useShadowingTracks(activeLanguage)
  const [editingEntry, setEditingEntry] = useState<ErrorJournalEntryRecord | null>(null)

  const linkOptions: LinkOption[] = useMemo(
    () => [
      ...words.map((word) => ({ value: `word:${word.id}`, label: `${t.errorJournal.linkWordPrefix} ${word.front}` })),
      ...tracks.map((track) => ({
        value: `shadowingTrack:${track.id}`,
        label: `${t.errorJournal.linkTrackPrefix} ${track.title}`,
      })),
    ],
    [words, tracks, t],
  )

  const resolveLinkLabel = (entry: ErrorJournalEntryRecord): string | null => {
    if (!entry.linkedRecordId || !entry.linkedRecordType) return null
    const option = linkOptions.find((opt) => opt.value === `${entry.linkedRecordType}:${entry.linkedRecordId}`)
    return option?.label ?? null
  }

  const handleSave = async (values: ErrorEntryFormValues) => {
    const link = parseLinkValue(values.linkValue)
    await errorJournalRepository.save({
      id: editingEntry?.id,
      language: activeLanguage,
      category: values.category,
      mistake: values.mistake.trim(),
      correction: values.correction.trim(),
      note: values.note.trim() || undefined,
      linkedRecordId: link?.id,
      linkedRecordType: link?.type,
    })
    setEditingEntry(null)
    await reload()
  }

  const handleDelete = async (entry: ErrorJournalEntryRecord) => {
    await errorJournalRepository.remove(entry.id)
    if (editingEntry?.id === entry.id) setEditingEntry(null)
    await reload()
  }

  return (
    <section className="error-journal-page">
      <h1>{t.pages.errorJournal.title}</h1>
      <p>{t.pages.errorJournal.description}</p>

      <ErrorEntryForm
        editingEntry={editingEntry}
        linkOptions={linkOptions}
        onSave={handleSave}
        onCancelEdit={() => setEditingEntry(null)}
      />

      <ErrorEntryList
        entries={entries}
        resolveLinkLabel={resolveLinkLabel}
        onEdit={setEditingEntry}
        onDelete={handleDelete}
      />
    </section>
  )
}

export default ErrorJournal
