// Core
import { useState } from 'react'
// Hooks
import { usePushSubscription } from '@/hooks/usePushSubscription'
import { useStudyBalanceStore } from '@/hooks/useStudyBalanceStore'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { createBackup, downloadBackup, isValidBackupFile, restoreBackup } from '@/services/backup/backupService'
// Types
import type { BackupFile } from '@/types/backup'
import type { ImportResult } from '@/services/backup/backupService'
// Styles
import './Settings.css'

function Settings() {
  const { t } = useTranslation()
  const push = usePushSubscription()
  const targetGermanPercent = useStudyBalanceStore((state) => state.targetGermanPercent)
  const setTargetGermanPercent = useStudyBalanceStore((state) => state.setTargetGermanPercent)

  const [pendingImport, setPendingImport] = useState<BackupFile | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)

  const handleExport = async () => {
    const backup = await createBackup()
    downloadBackup(backup)
  }

  const handleFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setImportError(null)
    setImportResult(null)

    try {
      const data = JSON.parse(await file.text())
      if (!isValidBackupFile(data)) {
        setImportError(t.settings.importInvalidFile)
        return
      }
      setPendingImport(data)
    } catch {
      setImportError(t.settings.importInvalidFile)
    }
  }

  const handleConfirmImport = async () => {
    if (!pendingImport) return
    const result = await restoreBackup(pendingImport)
    setPendingImport(null)
    setImportResult(result)
  }

  const handleCancelImport = () => setPendingImport(null)

  return (
    <section>
      <h1>{t.pages.settings.title}</h1>
      <p>{t.pages.settings.description}</p>

      <div className="settings-balance">
        <h2>{t.settings.balanceHeading}</h2>
        <label className="settings-balance__field">
          <span>{t.settings.balanceTargetLabel}</span>
          <input
            type="number"
            min={0}
            max={100}
            value={targetGermanPercent}
            onChange={(event) => setTargetGermanPercent(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="settings-backup">
        <h2>{t.settings.backupHeading}</h2>
        <div className="settings-backup__actions">
          <button type="button" onClick={handleExport}>
            {t.settings.exportButton}
          </button>
          <label className="settings-backup__import-label">
            {t.settings.importButton}
            <input type="file" accept="application/json" onChange={handleFileSelected} />
          </label>
        </div>

        {importError && <p className="settings-backup__error">{importError}</p>}

        {pendingImport && (
          <div className="settings-backup__confirm">
            <p>{t.settings.importConfirmMessage}</p>
            <div className="settings-backup__confirm-actions">
              <button type="button" onClick={handleConfirmImport}>
                {t.settings.importConfirm}
              </button>
              <button type="button" onClick={handleCancelImport}>
                {t.settings.importCancel}
              </button>
            </div>
          </div>
        )}

        {importResult && (
          <div className="settings-backup__success">
            <p>{t.settings.importSuccessMessage}</p>
            {importResult.skippedShadowingTracksCount > 0 && (
              <p>
                {importResult.skippedShadowingTracksCount} {t.settings.importSkippedTracksNote}
              </p>
            )}
            <button type="button" onClick={() => window.location.reload()}>
              {t.settings.importReloadButton}
            </button>
          </div>
        )}
      </div>

      <div className="settings-push">
        <h2>{t.settings.pushHeading}</h2>
        {push.supported ? (
          <>
            <button type="button" disabled={push.loading} onClick={push.subscribed ? push.disable : push.enable}>
              {push.subscribed ? t.settings.pushDisable : t.settings.pushEnable}
            </button>
            {push.error && <p className="settings-push__error">{push.error}</p>}
          </>
        ) : (
          <p>{t.settings.pushUnsupported}</p>
        )}
      </div>
    </section>
  )
}

export default Settings
