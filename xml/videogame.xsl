<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output
            method="xml"
            encoding="UTF-8"
            doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
            doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
            indent="yes"/>
    <xsl:template match="/">
        <!--Cloé Biringer & Raphaël Heraud-->
        <html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
            <head>
                <title><xsl:value-of select="videogame/game/title"/></title>
                <link href="../../Styles/stylepagexml.css" rel="stylesheet" title="Style principal"/>
                <link href="../../Styles/stylepagexmlalt.css" rel="alternate stylesheet" title="Style alternatif"/>
            </head>
            <body>
                <div class="top-bar">
                    <span id="date"></span>
                    <button type="button" id="switch">Changer de style</button>
                </div>
                <h1>
                   <xsl:value-of select="videogame/game/title"/>
                </h1>



                <div class="section">
                    <img alt="ImageInformation" src="../../Images/info-icon-svgrepo-com.svg"/>

                <div class="content">

                <h2>Informations</h2>
                    <h3>Plateforme(s)</h3>
                    <ul>
                    <xsl:for-each select="videogame/game/platform">
                        <li>
                        <xsl:value-of select="."/>
                        </li>
                    </xsl:for-each>
                    </ul>
                <h3>Développeur(s)</h3>
                    <ul>
                    <xsl:for-each select="videogame/game/developer">
                        <li>
                        <xsl:value-of select="."/>
                        </li>
                    </xsl:for-each>
                    </ul>
                <h3>Date de sortie</h3>
                    <p>
                    <xsl:value-of select="videogame/game/date/@day"/>&#160;<xsl:value-of select="videogame/game/date/@month"/>&#160;<xsl:value-of select="videogame/game/date/@year"/>
                    </p>
                <h3>Genre(s)</h3>
                    <ul>
                    <xsl:for-each select="videogame/game/genre">
                        <li>
                        <xsl:value-of select="."/>
                        </li>
                    </xsl:for-each>
                    </ul>
                <h3>Synopsis</h3>
                <p><xsl:value-of select="videogame/game/plot"/></p>
                </div>
                </div>
                <div class="section">
                    <img alt="ImageCommentaire" src="../../Images/comment-text-line-svgrepo-com.svg"/>
                    <div class="content">
                    <h2>Commentaires</h2>
                    <xsl:for-each select="videogame/comment">
                        <div class="article">
                        <h3><xsl:value-of select="@author"/></h3>
                        <p><xsl:value-of select="description"/></p>
                        </div>
                    </xsl:for-each>
                    </div>
                </div>
                <div class="section">
                    <img alt="ImageReview" src="../../Images/thumb-up-down-svgrepo-com.svg"/>
                    <div class="content">
                    <h2>Reviews</h2>
                    <xsl:for-each select="videogame/reviews/review">
                        <div class="article">
                            <h3>
                                <span><xsl:value-of select="reviewer"/></span>
                                <span><xsl:value-of select="@rating"/></span>
                            </h3>
                            <p><xsl:value-of select="arguments"/></p>
                        </div>
                    </xsl:for-each>
                    </div>
                </div>
                <div class="retour-accueil">
                    <a href="../../index.xhtml">Retour à la page d'accueil</a>
                </div>

                <script defer="defer" src="../../Code/JavaScript/foreverypage.js"> </script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>