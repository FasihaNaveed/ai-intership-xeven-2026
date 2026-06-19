from rank_bm25 import BM25Okapi

class BM25Retriever:

    def __init__(self, chunks):

        self.chunks = chunks

        self.tokenized_docs = [

            doc.page_content.split()

            for doc in chunks
        ]

        self.bm25 = BM25Okapi(
            self.tokenized_docs
        )

    def search(
        self,
        query,
        k=10
    ):

        tokens = query.split()

        return self.bm25.get_top_n(
            tokens,
            self.chunks,
            n=k
        )