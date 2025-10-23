'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import PartnerLayout from '@/components/partner/layout/PartnerLayout'
import PageHeader from '@/components/partner/layout/PageHeader'
import { PartnerChallengeSectionCard } from '@/components/partner/challenges/PartnerChallengeSectionCard'
import { usePartnerChallenges } from '@/hooks/usePartnerChallenges'
import {
  partnerAccents,
  partnerBorders,
  partnerSurfaces,
  partnerText,
} from '@/styles/design-system'
import { Gift } from 'lucide-react'

interface PartnerChallengeDetailPageProps {
  params: { id: string }
}

export default function PartnerChallengeDetailPage({ params }: PartnerChallengeDetailPageProps) {
  const router = useRouter()
  const { getChallengeById, allChallenges } = usePartnerChallenges()
  const challenge = getChallengeById(params.id)
  const dropdownItems = useMemo(
    () => allChallenges.map(item => ({ id: item.id, title: item.title })),
    [allChallenges]
  )

  const prizeEntries = useMemo(() => {
    if (!challenge) return []
    const entries: Array<{ label: string; value: string }> = []
    if (challenge.prizes.first) entries.push({ label: '1st Place', value: challenge.prizes.first })
    if (challenge.prizes.second) entries.push({ label: '2nd Place', value: challenge.prizes.second })
    if (challenge.prizes.third) entries.push({ label: '3rd Place', value: challenge.prizes.third })
    if (challenge.prizes.bonus) entries.push({ label: 'Bonus', value: challenge.prizes.bonus })
    return entries
  }, [challenge])

  if (!challenge) {
    return (
      <PartnerLayout forcedActivePath="/partners/challenges">
        <PageHeader
          title="Challenge Not Found"
          timer="T 00:00:00"
          status="Unavailable"
          breadcrumbItems={['All Challenges']}
          breadcrumbDropdownItems={dropdownItems}
          onBreadcrumbDropdownSelect={id => router.push(`/partners/challenges/${id}`)}
        />
        <div
          className="rounded-2xl border p-8 text-center text-sm"
          style={{
            backgroundColor: partnerSurfaces.card,
            borderColor: partnerBorders.subtle,
            color: partnerText.secondary,
          }}
        >
          We could not locate this challenge. Return to the challenge list and try again.
        </div>
      </PartnerLayout>
    )
  }

  const { detail } = challenge

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      router.push('/partners/challenges')
    }
  }

  const heroImage = challenge.coverImage ?? detail.company.heroImage ?? '/placeholder.jpg'

  const heroBackgroundStyle = heroImage
    ? {
        backgroundImage: `linear-gradient(130deg, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.2) 85%), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: 'linear-gradient(130deg, rgba(55, 170, 110, 0.65) 0%, rgba(18, 18, 18, 0.85) 70%)',
      }

  return (
    <PartnerLayout forcedActivePath="/partners/challenges">
      <PageHeader
        title="All Challenges"
        timer="T 18:46:09"
        status={challenge.status ?? 'Live'}
        breadcrumbItems={['All Challenges', challenge.title]}
        onBreadcrumbClick={handleBreadcrumbClick}
        breadcrumbDropdownItems={dropdownItems}
        onBreadcrumbDropdownSelect={id => router.push(`/partners/challenges/${id}`)}
        currentItemId={challenge.id}
      />

      <section className="space-y-10">
        <div
          className="relative overflow-hidden rounded-3xl border p-8 md:p-10"
          style={{
            ...heroBackgroundStyle,
            borderColor: partnerBorders.subtle,
            color: partnerText.primary,
          }}
        >
          <div className="relative z-10 max-w-3xl space-y-4">
            <p
              className="text-xs uppercase tracking-[0.12em] text-white/80"
            >
              {detail.heroSubtitle ?? `${challenge.sponsor} Partner Challenge`}
            </p>
            <h1 className="text-3xl font-semibold md:text-4xl">
              {challenge.title}
            </h1>
            <p className="text-sm md:text-base text-white/80">
              {challenge.summary}
            </p>
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.7) 100%)' }}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <div className="space-y-6">
            <PartnerChallengeSectionCard title="The Challenge">
              {detail.challenge.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </PartnerChallengeSectionCard>

            <PartnerChallengeSectionCard title="Insight" subtitle="Where to focus">
              {detail.insight.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </PartnerChallengeSectionCard>

            <PartnerChallengeSectionCard
              title="What We Will Bring"
              subtitle="Support during the weekend"
            >
              <ul className="list-disc space-y-2 pl-4">
                {detail.whatWeBring.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </PartnerChallengeSectionCard>
          </div>

          <div className="space-y-6">
            <PartnerChallengeSectionCard
              title={detail.company.name}
              subtitle="Company Info"
              variant="muted"
            >
              <p style={{ color: partnerText.primary }}>{detail.company.summary}</p>
              <p>{detail.company.description}</p>
              <div className="space-y-1 text-xs">
                {detail.company.website && (
                  <a
                    href={detail.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium"
                    style={{ color: partnerAccents.solid }}
                  >
                    Visit website
                  </a>
                )}
                {detail.company.contactEmail && (
                  <p>
                    <span style={{ color: partnerText.soft }}>Contact:</span>{' '}
                    <a
                      href={`mailto:${detail.company.contactEmail}`}
                      style={{ color: partnerText.primary }}
                    >
                      {detail.company.contactEmail}
                    </a>
                  </p>
                )}
                {detail.company.location && (
                  <p>
                    <span style={{ color: partnerText.soft }}>Location:</span>{' '}
                    <span>{detail.company.location}</span>
                  </p>
                )}
              </div>
            </PartnerChallengeSectionCard>

            <PartnerChallengeSectionCard
              title="Judging Criteria"
              variant="muted"
            >
              <ul className="space-y-3">
                {detail.judgingCriteria.map((criterion, index) => (
                  <li key={index} className="space-y-1">
                    <div
                      className="text-sm font-semibold"
                      style={{ color: partnerText.primary }}
                    >
                      {criterion.title}
                    </div>
                    <p>{criterion.description}</p>
                  </li>
                ))}
              </ul>
            </PartnerChallengeSectionCard>

            <PartnerChallengeSectionCard title="Prizes" variant="muted">
              <ul className="space-y-4">
                {prizeEntries.map(entry => (
                  <li
                    key={entry.label}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: partnerAccents.tint,
                        color: partnerAccents.solid,
                      }}
                    >
                      <Gift size={22} strokeWidth={1.8} />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className="text-base font-semibold"
                        style={{ color: partnerText.primary }}
                      >
                        {entry.label}
                      </span>
                      <span className="text-sm" style={{ color: partnerText.secondary }}>
                        Reward: {entry.value}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </PartnerChallengeSectionCard>

          </div>
        </div>
      </section>
    </PartnerLayout>
  )
}
