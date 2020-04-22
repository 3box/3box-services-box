FROM ipfs/go-ipfs

EXPOSE 4102 4103 5002 9090

COPY ipfs_data /data/ipfs

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/sbin/tini", "--", "/entrypoint.sh"]

CMD ["daemon", "--migrate=true", "--enable-pubsub-experiment"]
