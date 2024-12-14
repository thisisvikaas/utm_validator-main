'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type Channel = {
  name: string
  rule: string
}

const GA4_CHANNELS: Channel[] = [
  {
    name: 'Affiliate',
    rule: 'Medium exactly matches "affiliate"'
  },
  {
    name: 'Audio',
    rule: 'Traffic is DV360 AND DV360 creative format is Audio'
  },
  {
    name: 'Display',
    rule: 'Medium contains "display", "banner", "expandable", "interstitial", "cpm" OR Traffic is Google Ads with Display Network'
  },
  {
    name: 'Email',
    rule: 'Source or Medium exactly matches "email", "e-mail", "e_mail" or "e mail"'
  },
  {
    name: 'Mobile Push Notifications',
    rule: 'Medium ends with push OR Medium contains "mobile"/"notification" OR Source is "firebase"'
  },
  {
    name: 'Organic Search',
    rule: 'Source is a search site OR Medium exactly matches "organic"'
  },
  {
    name: 'Organic Shopping',
    rule: 'Source is a shopping site OR Campaign contains "shop"/"shopping"'
  },
  {
    name: 'Organic Social',
    rule: 'Source is a social site OR Medium contains social variants'
  },
  {
    name: 'Organic Video',
    rule: 'Source is a video site OR Medium contains "video"'
  },
  {
    name: 'Paid Search',
    rule: 'Source is a search site AND Medium starts with "cp.", "ppc" or "paid"'
  },
  {
    name: 'Paid Shopping',
    rule: 'Source is shopping site OR Campaign has "shop"/"shopping" AND Medium starts with "cp.", "ppc" or "paid"'
  },
  {
    name: 'Paid Social',
    rule: 'Source is a social site AND Medium contains "cp", matches "ppc" or starts with "paid"'
  },
  {
    name: 'Paid Video',
    rule: 'Source is a video site AND Medium contains "cp" or matches "ppc"/"retargeting" or starts with "paid"'
  },
  {
    name: 'SMS',
    rule: 'Source or Medium exactly matches "sms"'
  }
]

const SEARCH_ENGINES = ['360.cn','alice','aol','ar.search.yahoo.com','ask','at.search.yahoo.com','auone','avg','babylon','baidu','biglobe.co.jp','biglobe.ne.jp','br.search.yahoo.com','centrum.cz','ch.search.yahoo.com','cl.search.yahoo.com','cnn','co.search.yahoo.com','comcast','daum','de.search.yahoo.com','dk.search.yahoo.com','dogpile','dogpile.com','duckduckgo','ecosia.org','email.seznam.cz','es.search.yahoo.com','espanol.search.yahoo.com','exalead.com','excite.com','fi.search.yahoo.com','firmy.cz','fr.search.yahoo.com','globo','go.mail.ru','google','google-play','in.search.yahoo.com','incredimail','it.search.yahoo.com','kvasir','lite.qwant.com','m.baidu.com','m.naver.com','m.sogou.com','mail.rambler.ru','malaysia.search.yahoo.com','msn','msn.com','mx.search.yahoo.com','najdi','naver.com','news.google.com','nl.search.yahoo.com','no.search.yahoo.com','ntp.msn.com','onet','pe.search.yahoo.com','ph.search.yahoo.com','pl.search.yahoo.com','play.google.com','qwant','qwant.com','rakuten','rakuten.co.jp','rambler','search-results','search.aol.co.uk','search.google.com','search.smt.docomo.ne.jp','search.ukr.net','secureurl.ukr.net','seznam','seznam.cz','sg.search.yahoo.com','so.com','sogou.com','sp-web.search.auone.jp','startsiden','startsiden.no','suche.aol.de','terra','tr.search.yahoo.com','tw.search.yahoo.com','uk.search.yahoo.com','ukr','virgilio','wap.sogou.com','webmaster.yandex.ru','websearch.rakuten.co.jp','yahoo','yahoo.co.jp','yahoo.com','yandex','yandex.by','yandex.com','yandex.fr','yandex.kz','yandex.ru','yandex.uz','zen.yandex.ru','au.search.yahoo.com','biglobe','bing','ca.search.yahoo.com','cn.bing.com','conduit','daum.net','eniro','hk.search.yahoo.com','id.search.yahoo.com','lens.google.com','lycos','m.search.naver.com','mail.yandex.ru','naver','nz.search.yahoo.com','onet.pl','rambler.ru','se.search.yahoo.com','search.aol.com','sogou','th.search.yahoo.com','tut.by','us.search.yahoo.com','vn.search.yahoo.com','yandex.com.tr','yandex.ua']
const SOCIAL_NETWORKS = ['43things','43things.com','5ch.net','Hatena','ImageShack','activerain','activerain.com','activeworlds','addthis','addthis.com','airg.ca','allnurses.com','alumniclass','alumniclass.com','ameba.jp','ameblo.jp','americantowns','americantowns.com','amp.reddit.com','ancestry.com','anobii.com','answerbag','answerbag.com','aolanswers','aolanswers.com','ar.pinterest.com','askubuntu','askubuntu.com','athlinks','athlinks.com','away.vk.com','b.hatena.ne.jp','baby-gaga','baby-gaga.com','babyblog.ru','badoo','bebo','bebo.com','beforeitsnews.com','bharatstudent','bharatstudent.com','biip.no','biswap.org','bit.ly','blackcareernetwork.com','blackplanet.com','blip.fm','blog.com','blog.goo.ne.jp','blog.naver.com','blogg.no','bloggang.com','blogger','blogger.com','blogher','blogher.com','bloglines.com','blogs.com','blogsome','blogspot','blogspot.com','blogster','blurtit','blurtit.com','bookmarks.yahoo.co.jp','br.pinterest.com','brightkite','brizzly','brizzly.com','business.facebook.com','buzzfeed.com','buzznet','buzznet.com','cafe.naver.com','cafemom','cafemom.com','camospace','camospace.com','canalblog.com','care2','care2.com','caringbridge.org','catster.com','cbnt.io','cellufun','centerblog.net','chegg.com','chicagonow.com','chiebukuro.yahoo.co.jp','classmates.com','classquest','classquest.com','co.pinterest.com','cocolog-nifty','cocolog-nifty.com','copainsdavant.linternaute.com','couchsurfing.org','cozycot','cross.tv','crunchyroll','crunchyroll.com','cyworld','cyworld.com','d.hatena.ne.jp','dailystrength.org','deluxe.com','deviantart','deviantart.com','dianping','dianping.com','digg.com','diigo','diigo.com','disqus','dogster.com','dol2day','dol2day.com','doostang.com','dopplr','dopplr.com','douban.com','draft.blogger.com','draugiem.lv','drugs-forum.com','dzone','dzone.com','elftown','elftown.com','epicurious.com','everforo.com','extole','extole.com','facebook.com','faceparty','faceparty.com','fanpop','fanpop.com','fark','fark.com','fb','fc2','fc2.com','feedspot','feministing.com','filmaffinity','flickr','flickr.com','flipboard.com','folkdirect','folkdirect.com','foodservice.com','forums.androidcentral.com','forums.crackberry.com','forums.nexopia.com','forums.webosnation.com','forums.wpcentral.com','fotki.com','fotolog','fotolog.com','foursquare','foursquare.com','friendfeed','friendfeed.com','fruehstueckstreff.org','fubar.com','gaiaonline','gaiaonline.com','gamerdna.com','gather.com','geni.com','glassboard','glassboard.com','glassdoor','godtube','goldenline.pl','goldstar','goldstar.com','gooblog','goodreads','goodreads.com','google+','googleplus','govloop','govloop.com','gowalla.com','gree.jp','groups.google.com','gutefrage.net','habbo','habbo.com','hi5','hi5.com','hootsuite','hootsuite.com','houzz','hoverspot','hoverspot.com','hr.com','hubculture','hubculture.com','hubpages.com','hyves.net','ibibo','ibibo.com','id.pinterest.com','identi.ca','ig','imageshack.us','imvu','imvu.com','insanejournal','instagram','instagram.com','instapaper','internations.org','interpals.net','intherooms','irc-galleria.net','is.gd','italki.com','jammerdirect','jammerdirect.com','jappy.de','kakao','kakao.com','kakaocorp.com','kaneva.com','kin.naver.com','l.instagram.com','l.messenger.com','last.fm','librarything','librarything.com','lifestream.aol.com','line.me','linkedin','linkedin.com','listal','listal.com','listography','livedoor.com','livedoorblog','livejournal.com','lm.facebook.com','lnkd.in','m.blog.naver.com','m.facebook.com','m.kin.naver.com','m.yelp.com','mbga.jp','medium.com','meetin.org','meetup','meetup.com','meneame.net','menuism.com','messages.yahoo.co.jp','messenger','messenger.com','mixi.jp','mobile.facebook.com','mocospace','mouthshut','mouthshut.com','movabletype','mubi.com','my.opera.com','myanimelist.net','myheritage','mylife','mylife.com','mymodernmet','myspace','myspace.com','netvibes.com','news.ycombinator.com','nexopia','ngopost.org','niconico','nightlifelink','nightlifelink.com','ning','nl.pinterest.com','odnoklassniki.ru','odnoklassniki.ua','old.reddit.com','oneworldgroup.org','onstartups','onstartups.com','opendiary.com','oshiete.goo.ne.jp','over-blog.com','overblog.com','paper.li','partyflock.nl','photobucket.com','pinboard','pinboard.in','pingsta','pingsta.com','pinterest','pinterest.ca','pinterest.ch','pinterest.cl','pinterest.co.uk','pinterest.com','pinterest.com.au','pinterest.de','pinterest.es','pinterest.fr','pinterest.jp','pinterest.nz','pinterest.ph','pinterest.ru','pinterest.se','pixiv.net','playahead.se','plurk','plurk.com','plus.google.com','plus.url.google.com','pocket.co','posterous.com','pro.homeadvisor.com','pulse.yahoo.com','qapacity.com','quechup','quechup.com','quora.com','ravelry','ravelry.com','reddit','redux','redux.com','renren','researchgate.net','reunion','reunion.com','reverbnation','reverbnation.com','rtl.de','ryze.com','salespider','scoop.it','screenrant','screenrant.com','scribd.com','scvngr','scvngr.com','secondlife.com','serverfault','shareit','sharethis','sharethis.com','sites.google.com','skype','skyrock.com','slashdot.org','slideshare.net','snapchat','snapchat.com','sociallife.com.br','socialvibe','socialvibe.com','spaces.live.com','spoke','spoke.com','spruz','ssense.com','stackapps','stackapps.com','stackexchange.com','stackoverflow','stackoverflow.com','stickam','suomi24.fi','superuser','sweeva','sweeva.com','t.co','tagged','tagged.com','taggedmail','taggedmail.com','talkbiznow','talkbiznow.com','techmeme','techmeme.com','tencent','tencent.com','tiktok','tiktok.com','tinyurl','toolbox','toolbox.com','touch.facebook.com','travellerspoint','travellerspoint.com','tripadvisor.com','trombi','trombi.com','tudou','tudou.com','tuenti','tuenti.com','tumblr','tumblr.com','tweetdeck','tweetdeck.com','twitter','twitter.com','typepad','typepad.com','unblog.fr','urbanspoon.com','ushareit.com','ushi.cn','vampirefreaks','vampirefreaks.com','vampirerave','vg.no','video.ibm.com','vk.com','vkontakte.ru','wakoopa','wakoopa.com','wattpad','wattpad.com','web.skype.com','webshots.com','wechat','wechat.com','weebly.com','weibo','weibo.com','weread','weread.com','whatsapp','whatsapp.com','wiki.answers.com','wikihow.com','woot.com','wordpress.com','wordpress.org','xanga','xing','xing.com','yammer','yelp','yelp.co.uk','yelp.com','za.pinterest.com','zoo.gr','zooppa','51.com','academia.edu','activeworlds.com','allrecipes.com','anobii','answers.yahoo.com','apps.facebook.com','artstation.com','asmallworld.com','awe.sm','badoo.com','beforeitsnews','blackplanet','blog.feedspot.com','blog.yahoo.co.jp','bloglines','blogsome.com','blogster.com','bookmarks.yahoo.com','brightkite.com','buzzfeed','care.com','catster','cellufun.com','chat.zalo.me','chicagonow','classmates','cozycot.com','cz.pinterest.com','digg','discover.hubpages.com','disqus.com','dogster','doostang','douban','drugs-forum','edublogs.org','exblog.jp','facebook','fandom.com','fb.me','feministing','filmaffinity.com','flipboard','foodservice','forums.imore.com','fotki','free.facebook.com','fubar','gamerdna','getpocket.com','glassdoor.com','godtube.com','goo.gl','googlegroups.com','gowalla','gulli.com','houzz.com','hu.pinterest.com','hyves.nl','imageshack.com','in.pinterest.com','insanejournal.com','instapaper.com','intherooms.com','italki','jappy.com','kaboodle.com','kaneva','l.facebook.com','line','listography.com','livejournal','m.cafe.naver.com','m.vk.com','meinvz.net','messages.google.com','mix.com','mocospace.com','movabletype.com','mubi','myheritage.com','mymodernmet.com','netvibes','newsshowcase','nicovideo.jp','ning.com','okwave.jp','opendiary','out.reddit.com','photobucket','pinterest.at','pinterest.co.kr','pinterest.com.mx','pinterest.it','pinterest.pt','pl.pinterest.com','posterous','qapacity','quora','qzone.qq.com','reddit.com','renren.com','ryze','salespider.com','scribd','secondlife','serverfault.com','shvoong.com','skyrock','smartnews.com','social','spruz.com','stackexchange','stardoll.com','stickam.com','studivz.net','superuser.com','t.me','taringa.net','tinyurl.com','tr.pinterest.com','tripadvisor','trustpilot','twoo.com','vampirerave.com','web.facebook.com','webshots','weebly','wer-weiss-was.de','wikitravel.org','wordpress','xanga.com','yahoo-mbga.jp','yammer.com','youroom.in','zalo','zooppa.com']
const VIDEO_NETWORKS = ['blog.twitch.tv','crackle','curiositystream.com','d.tube','dailymotion','dashboard.twitch.tv','disneyplus','disneyplus.com','fast.wistia.net','help.netflix.com','hulu','hulu.com','id.twitch.tv','iq.com','iqiyi','iqiyi.com','jobs.netflix.com','justin.tv','m.twitch.tv','m.youtube.com','music.youtube.com','netflix','netflix.com','player.vimeo.com','ted','twitch.tv','utreon','veoh','veoh.com','viadeo.journaldunet.com','vimeo','wistia','wistia.com','youku','youku.com','youtube','youtube.com','crackle.com','curiositystream','dailymotion.com','help.hulu.com','player.twitch.tv','ted.com','twitch','utreon.com','vimeo.com']
const SHOPPING_NETWORKS = ['Google','aax-us-east.amazon-adsystem.com','aax.amazon-adsystem.com','alibaba.com','amazon','amazon.com','apps.shopify.com','checkout.shopify.com','checkout.stripe.com','cr.shopping.naver.com','cr2.shopping.naver.com','ebay','ebay.co.uk','ebay.com.au','ebay.de','etsy.com','m.alibaba.com','m.shopping.naver.com','mercadolibre','mercadolibre.com.ar','mercadolibre.com.mx','message.alibaba.com','msearch.shopping.naver.com','nl.shopping.net','no.shopping.net','offer.alibaba.com','one.walmart.com','order.shopping.yahoo.co.jp','s3.amazonaws.com','se.shopping.net','shopify','shopify.com','shopping.naver.com','shopping.yahoo.com','shopzilla','shopzilla.com','simplycodes.com','store.shopping.yahoo.co.jp','stripe','stripe.com','walmart','Shopping','IGShopping','alibaba','amazon.co.uk','ebay.com','etsy','mercadolibre.com','partners.shopify.com','shop.app','shopping.yahoo.co.jp','uk.shopping.net','walmart.com']

export default function Home() {
  const [url, setUrl] = useState('')
  const [parsedParams, setParsedParams] = useState<Record<string, string>>({})
  const [identifiedChannel, setIdentifiedChannel] = useState<string>('')

  const identifyChannel = (utmParams: Record<string, string>) => {
    const source = utmParams['utm_source']?.toLowerCase()
    const medium = utmParams['utm_medium']?.toLowerCase()
    const campaign = utmParams['utm_campaign']?.toLowerCase()

    if (!source && !medium) {
      return 'Direct'
    }

    // SMS
    if (source === 'sms' || medium === 'sms') {
      return 'SMS'
    }

    // Paid Social
    if (SOCIAL_NETWORKS.includes(source) && 
        (medium?.startsWith('cp') || medium === 'ppc' || medium?.startsWith('paid'))) {
      return 'Paid Social'
    }

    // Paid Video
    if (VIDEO_NETWORKS.includes(source) && 
        (medium?.startsWith('cp') || medium === 'ppc' || medium === 'retargeting' || medium?.startsWith('paid'))) {
      return 'Paid Video'
    }
    
    // Paid Search
    if (SEARCH_ENGINES.includes(source) && 
        (medium?.startsWith('cp') || medium?.startsWith('ppc') || medium?.startsWith('paid'))) {
      return 'Paid Search'
    }
    // Email
    const emailPatterns = ['email', 'e-mail', 'e_mail', 'e mail']
    if (emailPatterns.includes(source) || emailPatterns.includes(medium)) {
      return 'Email'
    }

    // Mobile Push Notifications
    if (source === 'firebase' || medium?.endsWith('push') || 
        medium?.includes('mobile') || medium?.includes('notification')) {
      return 'Mobile Push Notifications'
    }


    // Organic Video
    if (VIDEO_NETWORKS.includes(source) || medium?.includes('video')) {
      return 'Organic Video'
    }

    // Paid Shopping
    if ((SHOPPING_NETWORKS.includes(source) || campaign?.includes('shop') || campaign?.includes('shopping')) &&
        (medium?.startsWith('cp') || medium?.startsWith('ppc') || medium?.startsWith('paid'))) {
      return 'Paid Shopping'
    }

    // Organic Shopping
    if (SHOPPING_NETWORKS.includes(source) || 
        (campaign && (campaign.includes('shop') || campaign.includes('shopping')))) {
      return 'Organic Shopping'
    }

    // Organic Social
    const socialMediumPatterns = ['social', 'social-network', 'social-media', 'sm', 'social network', 'social media']
    if (SOCIAL_NETWORKS.includes(source) || socialMediumPatterns.some(pattern => medium?.includes(pattern))) {
      return 'Organic Social'
    }


    // Organic Search
    if (SEARCH_ENGINES.includes(source) || medium === 'organic') {
      return 'Organic Search'
    }

    // Display
    const displayPatterns = ['display', 'banner', 'expandable', 'interstitial', 'cpm']
    if (displayPatterns.some(pattern => medium?.includes(pattern))) {
      return 'Display'
    }

    // Affiliate
    if (medium === 'affiliate') {
      return 'Affiliate'
    }

    return 'Unassigned'
  }

  const parseUTMParams = (inputUrl: string) => {
    try {
      const urlObj = new URL(inputUrl)
      const utmParams: Record<string, string> = {}
      
      // Get all UTM parameters
      const searchParams = new URLSearchParams(urlObj.search)
      for (const [key, value] of searchParams.entries()) {
        if (key.startsWith('utm_')) {
          utmParams[key] = value
        }
      }
      
      setParsedParams(utmParams)
      setIdentifiedChannel(identifyChannel(utmParams))
    } catch (error) {
      setParsedParams({})
      setIdentifiedChannel('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      parseUTMParams(url)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Validate your UTM
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your URL with UTM parameters and press Enter to validate:
          </p>
        </div>

        <Input
          type="url"
          placeholder="https://example.com/?utm_source=google&utm_medium=cpc&utm_campaign=spring_sale"
          value={url}
          onChange={handleUrlChange}
          onKeyPress={handleKeyPress}
          className="w-full text-lg p-6"
        />

        {Object.keys(parsedParams).length > 0 && (
          <Card className="bg-green-50 border-0">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold">Parsed UTM Parameters:</h2>
              <div className="space-y-2">
                {Object.entries(parsedParams).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2">
                    <span className="font-medium min-w-[120px]">{key.replace('utm_', '')}:</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
              {identifiedChannel && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p className="font-semibold">Identified GA4 Channel:</p>
                  <p className="text-xl text-blue-600">{identifiedChannel}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold">GA4 Default Channel Rules</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Channel</th>
                    <th className="text-left p-2">Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {GA4_CHANNELS.map((channel) => (
                    <tr key={channel.name} className="border-b">
                      <td className="p-2 font-medium">{channel.name}</td>
                      <td className="p-2">{channel.rule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

