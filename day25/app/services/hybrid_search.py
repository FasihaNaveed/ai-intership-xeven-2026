class HybridRetriever:

    def __init__(
        self,
        vectorstore,
        bm25
    ):

        self.vectorstore = vectorstore

        self.bm25 = bm25

    def search(
        self,
        query
    ):

        semantic = self.vectorstore.similarity_search(
            query,
            k=14
        )

        keyword = self.bm25.search(
            query,
            k=6
        )

        merged = []

        merged.extend(
            semantic
        )

        merged.extend(
            keyword
        )

        unique = []

        seen = set()

        for doc in merged:

            if doc.page_content not in seen:

                seen.add(
                    doc.page_content
                )

                unique.append(doc)

        return unique[:20]