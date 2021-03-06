<?php

namespace Wikidot\DB;




use Ozone\Framework\Database\BaseDBPeer;

/**
 * Base peer Class mapped to the database table page_rate_vote.
 */
class PageRateVotePeerBase extends BaseDBPeer
{
    public static $peerInstance;

    protected function internalInit()
    {
        $this->tableName='page_rate_vote';
        $this->objectName='Wikidot\\DB\\PageRateVote';
        $this->primaryKeyName = 'rate_id';
        $this->fieldNames = array( 'rate_id' ,  'user_id' ,  'page_id' ,  'rate' ,  'date' );
        $this->fieldTypes = array( 'rate_id' => 'serial',  'user_id' => 'int',  'page_id' => 'int',  'rate' => 'int',  'date' => 'timestamp');
        $this->defaultValues = array( 'rate' => '1');
    }

    public static function instance()
    {
        if (self::$peerInstance == null) {
            $className = 'Wikidot\\DB\\PageRateVotePeer';
            self::$peerInstance = new $className();
        }
        return self::$peerInstance;
    }
}
